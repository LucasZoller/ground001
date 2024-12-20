import pg from "pg"
import { config } from "../config.js"
import argon2 from "argon2"
import { V4 } from "paseto"
import { generateBase64FromTimeStamp, convertExpirationTimestampToCookieMaxAge } from "../helpers/stringHelpers.js"

const pool = new pg.Pool(config.db)

export const authUserSignIn = async (request, reply) => {
  const email = request.body.email?.trim()
  const password = request.body.password?.trim()

  if (!email || !password) {
    throw new Error("ERR_FORM_NOT_FILLED")
  }
  // Form is not blank.
  let client
  try {
    client = await pool.connect()

    // Check if the email exists in the database.
    const user = await client.query(`SELECT id, user_code, user_name, aegis, lang, suspended, cart, hashed_rt FROM users WHERE email=$1 LIMIT 1`, [email])
    if (user.rows.length === 0) throw new Error("ERR_USER_NOT_FOUND")

    // Kick out suspended user immediately
    if (user.rows[0].suspended === true) {
      await client.query(`UPDATE users SET r_token = $1 WHERE email=$2`, [null, email])
      throw new Error("ERR_SUSPENDED") // Suspended user's hashed_rt is now null.
    }

    // Email exists in the DB. Now, verify password.
    const isPasswordMatching = await argon2.verify(user.rows[0].aegis, password)
    if (!isPasswordMatching) throw new Error("ERR_WRONG_PASSWORD") //  Password did not match.

    // If no errors by here, user exists, password matches.

    // 1. Re-hash the password with the latest hashing power

    const newHash = await argon2.hash(password, config.argon2)

    // 2. Save the re-hash

    await client.query(`UPDATE users SET aegis = $1 WHERE user_code=$2`, [newHash, user.rows[0].user_code])

    // 3. Generate AT and RT

    let tempAt, tempRawRt, tempHashedRt, tempAtDecodedObj, tempRtDecodedObj
    try {
      tempAt = await V4.sign({ sub: user.rows[0].user_code }, config.pasetoKeys.secret.at, {
        expiresIn: config.expiration.paseto.at
      })
      tempRawRt = await V4.sign({ sub: user.rows[0].user_code }, config.pasetoKeys.secret.rt, {
        expiresIn: config.expiration.paseto.rt
      })
      tempAtDecodedObj = await V4.verify(tempAt, config.pasetoKeys.public.at)
      tempRtDecodedObj = await V4.verify(tempRawRt, config.pasetoKeys.public.rt)

      // 4. Hash RT

      tempHashedRt = await argon2.hash(tempRawRt, config.argon2)
    } catch (err) {
      throw new Error("TOKEN_GENERATION_FAILED", { cause: err })
    }
    const at = tempAt
    const rawRt = tempRawRt
    const hashedRt = tempHashedRt

    const atExpTimestamp = tempAtDecodedObj.exp // Timestamp e.g 2024-09-30T10:01:47.201Z
    //const atExp = new Date(atExpTimestamp).getTime() // Output in milliseconds
    const atMaxAge = convertExpirationTimestampToCookieMaxAge(atExpTimestamp) // Output in seconds
    const atExpInBase64Url = generateBase64FromTimeStamp(atExpTimestamp)

    const rtExpTimestamp = tempRtDecodedObj.exp // Timestamp e.g 2024-10-03T10:01:42.203Z
    const rtMaxAge = convertExpirationTimestampToCookieMaxAge(rtExpTimestamp) // Output in seconds
    const rtExpInBase64Url = generateBase64FromTimeStamp(rtExpTimestamp)
    // 5. Update hashed_rt in the database

    await client.query(`UPDATE users SET hashed_rt=$1 WHERE user_code=$2`, [hashedRt, user.rows[0].user_code])

    // 6.Set RT and site-session in client's cookie

    return (
      reply
        .setCookie("torch", at, {
          path: "/", // Makes the cookie accessible from all paths in the backend
          httpOnly: true, //Prevents access via JavaScript
          secure: process.env.NODE_ENV === "production", // Ensures it's only sent over HTTPS
          sameSite: "Lax", // Prevents CSRF attacks
          maxAge: atMaxAge // Seconds. NOT milliseconds.
        })
        .setCookie("flameout", atExpInBase64Url, {
          path: "/",
          httpOnly: true, // Accessible to JavaScript
          secure: true, // Send only over HTTPS (set to false for local dev)
          sameSite: "Strict",
          maxAge: atMaxAge // Seconds. NOT milliseconds.
        })
        .setCookie("revive", rawRt, {
          path: "/", // Makes the cookie accessible from all paths in the backend
          httpOnly: true, //Prevents access via JavaScript
          secure: process.env.NODE_ENV === "production", // Ensures it's only sent over HTTPS
          sameSite: "Lax", // Prevents CSRF attacks
          maxAge: rtMaxAge // Seconds. NOT milliseconds.
        })
        .setCookie("end", rtExpInBase64Url, {
          path: "/",
          httpOnly: true, // Accessible to JavaScript
          secure: true, // Send only over HTTPS (set to false for local dev)
          sameSite: "Strict",
          maxAge: rtMaxAge // Seconds. NOT milliseconds.
        })

        // 7. Send response
        .code(200)
        .send({
          id: user.rows[0].id,
          userName: user.rows[0].user_name,
          cartItems: user.rows[0].cart,
          lang: user.rows[0].lang
        })
    )
  } finally {
    if (client) client.release()
  }
}
