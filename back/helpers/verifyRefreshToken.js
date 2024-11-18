import pg from "pg"
import { config } from "../config.js"
import { V4 } from "paseto"
import argon2 from "argon2"

export const verifyRefreshToken = async clientRt => {
  console.log("🦉verifyRefreshToken ENTERED : clientRt? :", clientRt)
  let client
  let userCode
  let result
  try {
    const decodedRt = await V4.verify(clientRt, config.pasetoKeys.public.rt) // Decoding RT with Paseto
    console.log("The shape of the decoded object?? : ", decodedRt)
    // {sub: 'hkEwDPystlnvRQdF', iat: '2024-11-16T12:23:13.954Z', exp: '2024-11-19T12:23:13.954Z'}
    userCode = decodedRt.sub // "sub" is the user_code.
  } catch (err) {
    if (err.code === "ERR_PASETO_CLAIM_INVALID") throw new Error("ERR_RT_EXPIRED", { cause: err })
    //↑ Expired RT shouldn't exist in the browser. Very suspicious.
    throw new Error("ERR_INVALID_RT", { cause: err })
    //↑ Also very suspicious. RT was possibly faked.
  }

  try {
    const pool = new pg.Pool(config.db)
    client = await pool.connect() // Connect to the pool
    const user = await client.query(
      `
          SELECT user_name, suspended, hashed_rt FROM users WHERE user_code=$1 LIMIT 1
          `,
      [userCode]
    )

    if (!user.rows[0]) throw new Error("ERR_USER_NOT_FOUND") // No user found with this user_code.

    // Kick out suspended user immediately
    if (user.rows[0].suspended === true) {
      await client.query(`UPDATE users SET hashed_rt = $1 WHERE user_code=$2`, [null, userCode])
      throw new Error("ERR_SUSPENDED") // Suspended user's hashed_rt is now null.
    }

    // Verify RT against hashed_rt in the database using Argon2Id.
    const isRtMatching = await argon2.verify(user.rows[0].hashed_rt, clientRt)
    if (!isRtMatching) throw new Error("ERR_RT_NOT_MATCHING") //Stored RT and client RT didn't match.

    // The RT has passed all the tests. Return userCode.
    result = { userCode, tokenType: "RT", guardHash: config.guardHash.rt }
  } finally {
    if (client) {
      client.release() // Release the client back to the pool
      console.log("🔓🔓🔓 Client released back to the pool")
    }
  }
  return result
}
