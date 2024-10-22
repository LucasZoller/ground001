import pg from "pg"
import { config } from "../config.js"
import argon2 from "argon2"
import { V4 } from "paseto"
import { generateBase64FromTimeStamp, convertExpirationTimestampToCookieMaxAge } from "../helpers/stringHelpers.js"

const pool = new pg.Pool(config.db)

export const authUserLogin = async (request, reply) => {
  const { email, password } = request.body
  if (!email?.trim() || !password?.trim()) {
    throw new Error("ERR_FORM_NOT_FILLED")
  }
  // Form is not blank.
  let client
  try {
    client = await pool.connect()

    // Check if the email exists in the database.
    const user = await client.query(`SELECT user_code, aegis, suspended FROM users WHERE email=$1 LIMIT 1`, [email])
    if (user.rows.length === 0) throw new Error("ERR_USER_NOT_FOUND")

    // Kick out suspended user immediately
    if (user.rows[0].suspended === true) {
      await client.query(`UPDATE users SET r_token = $1 WHERE email=$2`, [null, email])
      throw new Error("ERR_SUSPENDED") // Suspended user's hashed_rt is now null.
    }

    // Email exists in the DB. Now, verify password.
    const isPasswordMatching = await argon2.verify(user.rows[0].aegis, password)
    if (!isPasswordMatching) throw new Error("ERR_WRONG_PASSWORD") //  Password did not match.

    // If no errors by here, password matched. Proceed as usual

    // 1. Re-hash the password with the latest hashing power

    const newHash = await argon2.hash(password, config.argon2)

    // 2. Save the re-hash

    await client.query(`UPDATE users SET aegis = $1 WHERE user_code=$2`, [newHash, user.rows[0].user_code])

    // 3. Generate access token and refresh token

    let tempAt, tempRawRt, tempHashedRt, tempAtDecodedObj, tempRtDecodedObj
    try {
      tempAt = await V4.sign({ sub: user.rows[0].user_code }, config.pasetoKeys.secret.at, { expiresIn: config.expiration.paseto.at })
      tempRawRt = await V4.sign({ sub: user.rows[0].user_code }, config.pasetoKeys.secret.rt, { expiresIn: config.expiration.paseto.rt })
      tempAtDecodedObj = await V4.verify(tempAt, config.pasetoKeys.public.at)
      tempRtDecodedObj = await V4.verify(tempRawRt, config.pasetoKeys.public.rt)

      // 4. Hash refresh token

      tempHashedRt = await argon2.hash(tempRawRt, config.argon2)
    } catch (err) {
      throw new Error("TOKEN_GENERATION_FAILED", { cause: err })
    }
    const at = tempAt
    const rawRt = tempRawRt
    const hashedRt = tempHashedRt

    const atExpTimestamp = tempAtDecodedObj.exp // Timestamp e.g 2024-09-30T10:01:47.201Z
    const rtExpTimestamp = tempRtDecodedObj.exp // Timestamp e.g 2024-10-03T10:01:42.203Z
    const atExp = new Date(atExpTimestamp).getTime() // Milliseconds
    const rtMaxAge = convertExpirationTimestampToCookieMaxAge(rtExpTimestamp) // Outputs seconds
    const rtExpInBase64Code = generateBase64FromTimeStamp(rtExpTimestamp)
    // 5. Update hashed_rt in the database

    await client.query(`UPDATE users SET hashed_rt=$1 WHERE user_code=$2`, [hashedRt, user.rows[0].user_code])

    // 6.Set refresh token in a httpOnly cookie

    return (
      reply
        .setCookie("cltoken", rawRt, {
          path: "/", // Makes the cookie accessible from all paths in the backend
          httpOnly: true, //Prevents access via JavaScript
          secure: process.env.NODE_ENV === "production", // Ensures it's only sent over HTTPS
          sameSite: "Lax", // Prevents CSRF attacks
          maxAge: rtMaxAge // Seconds. NOT milliseconds.
        })
        .setCookie("site-session", rtExpInBase64Code, {
          path: "/",
          httpOnly: false, // Accessible to JavaScript
          secure: true, // Send only over HTTPS (set to false for local dev)
          sameSite: "Strict",
          maxAge: rtMaxAge // Seconds. NOT milliseconds.
        })

        // 7. Send response
        .code(200)
        .send({ code: "LOGGED_IN", at, atExp })
    )
  } finally {
    if (client) client.release()
  }
}
