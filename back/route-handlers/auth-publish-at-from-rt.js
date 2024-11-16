import pg from "pg"
import { config } from "../config.js"
import { V4 } from "paseto"
import argon2 from "argon2"
import { generateMaxAgeAndTimestampInMsFromPasetoTokenHelper } from "../helpers/tokenHelpers.js"
const pool = new pg.Pool(config.db)

export const publishAtFromRtPlugin = async (request, reply) => {
  const headers = request.headers["authorization"]
  if (!headers) throw new Error("ERR_NO_RT_HEADERS")
  if (!headers.startsWith("Bearer ")) throw new Error("ERR_INVALID_RT_HEADER")
  const clientRt = headers.split(" ")[1]

  // 1. Gain userCode from RT using Paseto
  let decodedRt
  try {
    decodedRt = await V4.verify(clientRt, config.pasetoKeys.public.rt) // Decoding RT with Paseto
  } catch (err) {
    if (err.code === "ERR_PASETO_CLAIM_INVALID")
      throw new Error("ERR_RT_EXPIRED", { cause: err })
    // Suspiciout case : Expired RT shouldn't exist in the cookie.
    throw new Error("ERR_INVALID_RT", { cause: err })
    // Suspiciout case : Header was possibly modified and RT is fake.
  }
  const userCode = decodedRt.sub // We have the user_code from RT.

  // 2. Find user in the database.
  let client
  try {
    client = await pool.connect() // Connect to the pool

    const user = await client.query(
      `
          SELECT user_code, user_name, lang, suspended, cart, hashed_rt FROM users WHERE user_code=$1 LIMIT 1
          `,
      [userCode]
    )

    if (!user.rows[0]) throw new Error("ERR_USER_NOT_FOUND") // No user found with this user_code.

    // 3. Kick out suspended user immediately
    if (user.rows[0].suspended === true) {
      await client.query(`UPDATE users SET hashed_rt = $1 WHERE user_code=$2`, [
        null,
        userCode,
      ])
      throw new Error("ERR_SUSPENDED") // Suspended user's hashed_rt is now null.
    }

    // 4. Verify RT against hashed_rt in the database using Argon2Id.

    const isRtMatching = await argon2.verify(user.rows[0].hashed_rt, clientRt)
    if (!isRtMatching) throw new Error("ERR_RT_NOT_MATCHING") //Stored RT and client RT didn't match.

    // 5. Genrate new RT/AT
    let tempAt, tempRawRt, tempHashedRt
    try {
      tempAt = await V4.sign(
        { sub: user.rows[0].user_code },
        config.pasetoKeys.secret.at,
        { expiresIn: config.expiration.paseto.at }
      )
      tempRawRt = await V4.sign(
        { sub: user.rows[0].user_code },
        config.pasetoKeys.secret.rt,
        { expiresIn: config.expiration.paseto.rt }
      )

      // 6. Hash the new RT

      tempHashedRt = await argon2.hash(tempRawRt, config.argon2)
    } catch (err) {
      throw new Error("TOKEN_GENERATION_FAILED", { cause: err })
    }
    const at = tempAt
    const rawRt = tempRawRt
    const hashedRt = tempHashedRt
    const { atMaxAge, atExpInBase64Url, rtMaxAge, rtExpInBase64Url } =
      await generateMaxAgeAndTimestampInMsFromPasetoTokenHelper(at, rawRt)

    // 7. Update hashed_rt in the database (RT rotation)
    await client.query(`UPDATE users SET hashed_rt=$1 WHERE user_code=$2`, [
      hashedRt,
      user.rows[0].user_code,
    ])

    // 8. Send the results
    reply.code(200).send({
      userName: user.rows[0].user_name,
      cartItems: user.rows[0].cart,
      lang: user.rows[0].lang,
      at,
      atExpInSec: atMaxAge,
      rt: rawRt,
      rtExpInSec: rtMaxAge,
    })
  } finally {
    if (client) {
      client.release() // Release the client back to the pool
      console.log("🔓🔓🔓 Client released back to the pool")
    }
  }
}
