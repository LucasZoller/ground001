import pg from "pg"
import { config } from "../config.js"
import { V4 } from "paseto"
import argon2 from "argon2"
import { generateBase64FromTimeStamp, convertExpirationTimestampToCookieMaxAge } from "../helpers/stringHelpers.js"

const pool = new pg.Pool(config.db)

export const publishAtFromRtPlugin = async (request, reply) => {
  const cookies = request.cookies

  console.log("🧵🧵🧵🧵🧵🧵 Entered publishAtFromRtPlugin : Show cookie if available", cookies)

  if (!cookies) throw new Error("ERR_NO_COOKIES") // No cookies found at all.
  if (!cookies.cltoken) throw new Error("ERR_NO_RT_IN_COOKIES") // No RT found in cookies.

  const clientRt = cookies.cltoken

  // 1. Gain userCode from RT using Paseto
  let decodedRt
  try {
    decodedRt = await V4.verify(clientRt, config.pasetoKeys.public.rt) // Decoding RT with Paseto
  } catch (err) {
    if (err.code === "ERR_PASETO_CLAIM_INVALID") throw new Error("ERR_RT_EXPIRED", { cause: err })
    throw new Error("ERR_INVALID_RT", { cause: err })
  }
  const userCode = decodedRt.sub // We have the user_code from RT.

  // 2. Find user in the database.
  let client
  try {
    client = await pool.connect() // Connect to the pool

    const user = await client.query(
      `
        SELECT user_code, user_name, lang, suspended, hashed_rt FROM users WHERE user_code=$1 LIMIT 1
        `,
      [userCode]
    )

    if (!user.rows[0]) throw new Error("ERR_USER_NOT_FOUND") // No user found with this user_code.

    // 3. Kick out suspended user immediately

    if (user.rows[0].suspended === true) {
      await client.query(`UPDATE users SET hashed_rt = $1 WHERE user_code=$2`, [null, userCode])
      throw new Error("ERR_SUSPENDED") // Suspended user's hashed_rt is now null.
    }

    // 4. Verify RT against hashed_rt in the database.

    const isRtMatching = await argon2.verify(user.rows[0].hashed_rt, clientRt)
    if (!isRtMatching) throw new Error("ERR_RT_NOT_MATCHING")

    // 5. Genrate new RT/AT

    let tempAt, tempRawRt, tempHashedRt, tempAtDecodedObj, tempRtDecodedObj
    try {
      tempAt = await V4.sign({ sub: user.rows[0].user_code }, config.pasetoKeys.secret.at, { expiresIn: config.expiration.paseto.at })
      tempRawRt = await V4.sign({ sub: user.rows[0].user_code }, config.pasetoKeys.secret.rt, { expiresIn: config.expiration.paseto.rt })
      tempAtDecodedObj = await V4.verify(tempAt, config.pasetoKeys.public.at)
      tempRtDecodedObj = await V4.verify(tempRawRt, config.pasetoKeys.public.rt)

      // 6. Hash the new RT

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
    // 7. Update hashed_rt in the database (RT rotation)

    await client.query(`UPDATE users SET hashed_rt=$1 WHERE user_code=$2`, [hashedRt, user.rows[0].user_code])

    // 8. Send rawRT via httpOnly Cookie

    reply
      .setCookie("cltoken", rawRt, {
        httpOnly: true, //Prevents access via JavaScript
        secure: true,
        // secure: process.env.NODE_ENV === "production", // Ensures it's only sent over HTTPS
        sameSite: "Lax", // Prevents CSRF attacks
        maxAge: rtMaxAge // Accepts seconds. NOT milliseconds.
      })
      // 9. Send AT

      .code(200)
      .send({ at, atExp })
  } finally {
    if (client) {
      client.release() // Release the client back to the pool
      console.log("🔓🔓🔓 Client released back to the pool")
    }
  }
}
