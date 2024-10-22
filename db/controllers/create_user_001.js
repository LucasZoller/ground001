import pg from "pg"
import argon2, { argon2id } from "argon2"
import paseto from "paseto"
import crypto from "crypto"

const pool = new pg.Pool({
  user: process.env.USER,
  password: process.env.PASS,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DBPORT
})

export async function createUser001(req, res) {
  try {
    const client = await pool.connect()

    try {
      // Check if the email already exists in the database.
      const { email } = req.body
      const checkEmail = await client.query(`SELECT 1 FROM users WHERE email=$1 LIMIT 1`, [email])
      if (checkEmail.rows.length > 0) {
        throw new Error("ERR_EMAIL_EXISTS") //Break out from the try block immediately.
      }

      // Email is good. Now, create a unique user code.
      let code16
      function generateRandomString(howLong) {
        const choices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let string = ""
        for (let i = 0; i < howLong; i++) {
          const randomIndex = Math.floor(Math.random() * choices.length)
          string += choices.charAt(randomIndex)
        }
        return string
      }

      while (true) {
        code16 = generateRandomString(16)
        const emptyIfUnique = await client.query(
          // emptyIfUnique is : ` [ { '?column?': 1 } ]` if found. `[]` if no match.
          `SELECT 1 FROM users WHERE user_code = $1 LIMIT 1
          `,
          [code16]
        )
        if (emptyIfUnique.rows.length === 0) break
      }

      // Create hashed password using Argon2id
      const { password, language } = req.body
      // Argon2 settings from .env file.
      const argon2Config = {
        type: argon2id,
        memoryCost: process.env.ARGON2_MEMORY_COST,
        timeCost: process.env.ARGON2_TIME_COST,
        parallelism: process.env.ARGON2_PARALLELISM
      }
      // Hash the password
      const hashedPassword = await argon2.hash(password, argon2Config)

      //Create refresh token from userCode
      const userCode = code16
      let at
      let rt
      try {
        const { V4 } = paseto
        const theKey = process.env.PASETO_SECRET_KEY
        const at = await V4.sign({ sub: userCode, suspended: false }, theKey, { expiresIn: "10m" })
        const rf = await V4.sign({ sub: userCode, suspended: false }, theKey, { expiresIn: "72 hours" })
      } catch (err) {
        throw new Error("TOKEN_GENERATION_FAILED")
      }

      // Actual data insertion
      const accessToken = at
      const refreshToken = rt
      const username = "user_" + code16
      const suspended = false
      const createdAt = new Date().toISOString()
      const modifiedAt = new Date().toISOString()
      const values = [userCode, language, username, email, hashedPassword, refreshToken, createdAt, modifiedAt, suspended]
      await client.query(
        `INSERT INTO users(
        user_code, lang, user_name, email, aegis, r_token, created_at, last_modified_at, suspended
        ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)
         ON CONFLICT (user_code) DO NOTHING`,
        values
      )

      res.status(200).json({ dbSays: "USER_CREATED", at: accessToken, rt: refreshToken })
    } catch (innerErr) {
      throw innerError
    } finally {
      client.release()
    }
  } catch (err) {
    console.log("🧨", err)
    switch (err.message) {
      case "ERR_EMAIL_EXISTS":
        res.status(400).json({ dbSays: err.message })
        break
      case "TOKEN_GENERATION_FAILED":
        res.status(500).json({ dbSays: "SERVER_ERROR" })
        break
      default:
        res.status(500).json({ dbSays: "SERVER_ERROR" })
    }
  }
}
