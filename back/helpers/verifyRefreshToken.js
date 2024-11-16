import pg from "pg"
import { config } from "../config.js"
import { V4 } from "paseto"
import argon2 from "argon2"
import { generateMaxAgeAndTimestampInMsFromPasetoTokenHelper } from "./tokenHelpers.js"

const pool = new pg.Pool(config.db)

export const verifyRefreshToken = async (clientRt) => {
  console.log("🦉verifyRefreshToken ENTERED : clientRt? :", clientRt)
  let client
  let userCode
  let result
  try {
    const decodedRt = await V4.verify(clientRt, config.pasetoKeys.public.rt) // Decoding RT with Paseto
    console.log("Why can't we decode userCode?? : ", decodedRt)
    //Why can't we decode userCode?? :  { iat: '2024-11-11T08:45:37.101Z', exp: '2024-11-14T08:45:37.101Z' }
    // *******For some reason, the code doesn't include sub!!!*********
    userCode = decodedRt.sub // We have the user_code from RT.
    console.log(
      "🐝The first round, it works. But after, this is possibly undefined. Why?? : ",
      decodedRt.sub
    )
  } catch (err) {
    if (err.code === "ERR_PASETO_CLAIM_INVALID")
      throw new Error("ERR_RT_EXPIRED", { cause: err })
    //↑ Expired RT shouldn't exist in the browser. Very suspicious.
    throw new Error("ERR_INVALID_RT", { cause: err })
    //↑ Also very suspicious. RT was possibly faked.
  }

  try {
    console.log("🦉Why is this userCode failing to find user?", userCode)

    client = await pool.connect() // Connect to the pool
    const user = await client.query(
      `
          SELECT user_name, lang, suspended, cart, hashed_rt FROM users WHERE user_code=$1 LIMIT 1
          `,
      [userCode]
    )
    console.log("🦉🦉What is this?? : user.rows[0] ? :", user.rows[0])

    if (!user.rows[0]) throw new Error("ERR_USER_NOT_FOUND") // No user found with this user_code.

    // Kick out suspended user immediately
    if (user.rows[0].suspended === true) {
      await client.query(`UPDATE users SET hashed_rt = $1 WHERE user_code=$2`, [
        null,
        userCode,
      ])
      throw new Error("ERR_SUSPENDED") // Suspended user's hashed_rt is now null.
    }

    // Verify RT against hashed_rt in the database using Argon2Id.

    const isRtMatching = await argon2.verify(user.rows[0].hashed_rt, clientRt)
    if (!isRtMatching) throw new Error("ERR_RT_NOT_MATCHING") //Stored RT and client RT didn't match.

    // Genrate new RT/AT
    let tempAt, tempRawRt, tempHashedRt
    try {
      tempAt = await V4.sign({ sub: userCode }, config.pasetoKeys.secret.at, {
        expiresIn: config.expiration.paseto.at,
      })

      tempRawRt = await V4.sign(
        { sub: userCode },
        config.pasetoKeys.secret.rt,
        { expiresIn: config.expiration.paseto.rt }
      )
      console.log(
        "🪰🪰🪰🪰🪰🪰🪰🪰🪰🪰🪰🪰We found the culprit!!! userCode: ",
        userCode
      )
      console.log(
        "🪰🪰🪰🪰🪰🪰🪰🪰🪰🪰🪰🪰We found the culprit!!! user.rows[0].user_code: ",
        user.rows[0].user_code
      )
      console.log("🪰🪰🪰🪰🪰🪰🪰🪰🪰🪰🪰🪰user.rows[0] : ", user.rows[0])
      console.log("🪰🪰🪰🪰🪰🪰🪰🪰🪰🪰🪰🪰user : ", user)
      const suspiciousRtTest = await V4.verify(
        tempRawRt,
        config.pasetoKeys.public.rt
      )
      console.log(
        "🪰🪰🪰🪰🪰🪰Decoded result of the suspicious RT. This RT was just created. Does the output include sub??",
        suspiciousRtTest
      )

      console.log(
        "🦖🦖🦖Right after V4.sign. This is what is included as sub. : user.rows[0].user_code : ",
        userCode
      )
      // Hash the new RT
      tempHashedRt = await argon2.hash(tempRawRt, config.argon2)
    } catch (err) {
      throw new Error("TOKEN_GENERATION_FAILED", { cause: err })
    }
    const at = tempAt
    const rawRt = tempRawRt
    console.log("🦈There may be a problem at tempRt : ", rawRt)

    const hashedRt = tempHashedRt
    const { atMaxAge, atExpInBase64Url, rtMaxAge, rtExpInBase64Url } =
      await generateMaxAgeAndTimestampInMsFromPasetoTokenHelper(at, rawRt)

    result = {
      userCode,
      at,
      rawRt,
      atMaxAge,
      atExpInBase64Url,
      rtMaxAge,
      rtExpInBase64Url,
    }

    // 7. Update hashed_rt in the database (RT rotation)
    await client.query(`UPDATE users SET hashed_rt=$1 WHERE user_code=$2`, [
      hashedRt,
      user.rows[0].user_code,
    ])
  } finally {
    if (client) {
      client.release() // Release the client back to the pool
      console.log("🔓🔓🔓 Client released back to the pool")
    }
  }
  return result
}
