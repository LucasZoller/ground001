import pg from "pg"
import { V4 } from "paseto"
import argon2, { argon2id } from "argon2"

const pool = new pg.Pool({
  user: process.env.USER,
  password: process.env.PASS,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DBPORT
})

export const publishAtFromRt = async (req, res) => {
  const cookies = req.cookies
  console.log("🧵🧵🧵🧵🧵🧵 Entered publishAtFromRt : Show cookie if available", cookies)
  let client
  try {
    if (!cookies?.refreshYO) throw new Error("NO_COOKIES_FOUND") // No cookies found

    console.log("🧵🧵🧵 Total clients in the pool:", pool.totalCount)
    // Connect to the pool
    client = await pool.connect()

    try {
      const refreshToken = cookies.refreshYO //RT is still hashed at this point.

      let decoded
      try {
        console.log("🧵🧵🧵 RT found in Cookie. Entering V4.verify")
        decoded = await V4.verify(refreshToken, process.env.PASETO_PUBLIC_KEY) // The RT from the cookie is legit and not exipred.
      } catch (err) {
        throw new Error("RT_DECODE_FAILED")
      }

      const userCode = decoded.sub // We have the user_code from RT.
      const data = await client.query(
        `
        SELECT user_code, user_name, lang, suspended FROM users WHERE user_code=$1 LIMIT 1
        `,
        [userCode]
      )

      if (!data.rows[0]) throw new Error("NO_USER_FOUND") // No user found with this user_code.

      const theKey = process.env.PASETO_SECRET_KEY
      const newAccessToken = await V4.sign({ sub: userCode }, theKey, { expiresIn: "10 seconds" })
      console.log("🎃🎃🎃Cookie RT was legit and not expired. Here is the new AT : 🎇", newAccessToken)
      res.status(200).send(newAccessToken)
    } catch (innerErr) {
      throw innerErr
    }
  } catch (err) {
    switch (err.message) {
      case "NO_COOKIES_FOUND":
      case "NO_USER_FOUND":
        console.log(err.message)
        res.status(400).send(err.message)
        break
      case "RT_DECODE_FAILED":
        console.log(err.message)
      // res.status(500).send("TOKEN_ERROR")
      default:
        console.log(err.message)
        res.status(500).send("SERVER_ERROR")
    }
  } finally {
    if (client) {
      client.release() // Release the client back to the pool
      console.log("🔓🔓🔓 Client released back to the pool")
    }
  }
}
