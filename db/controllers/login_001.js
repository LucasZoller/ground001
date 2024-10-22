import pg from "pg"
import argon2, { argon2id } from "argon2"
import { V4 } from "paseto"

const pool = new pg.Pool({
  user: process.env.USER,
  password: process.env.PASS,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DBPORT
})

export async function login001(req, res) {
  try {
    const { email, password } = req.body
    if (!email?.trim() || !password?.trim()) {
      throw new Error("FORM_NOT_FILLED")
      // await res.status(400).json({ dbSays: "FORM_NOT_FILLED" })
    }
    // Form is not blank.
    const client = await pool.connect()

    try {
      // Check if the email exists in the database.
      const user = await client.query(`SELECT user_code, aegis, suspended FROM users WHERE email=$1 LIMIT 1`, [email])
      if (user.rows.length === 0) {
        throw new Error("USER_NOT_FOUND") // Break out from the try block immediately.
      }
      if (user.rows.suspended === true) {
        try {
          await client.query(`UPDATE users SET r_token = $1 WHERE email=$2`, ["", email])
        } catch (err) {
          throw err
        }
        throw new Error("FORBIDDEN") // User is suspended and rt is now cleared.
      }

      // Email exists in the DB. Now, verify password.
      if (await argon2.verify(user.rows[0].aegis, password)) {
        // True : Password match

        // 1. Re-hash the password with the latest hashing power
        const argon2Config = {
          type: argon2id,
          memoryCost: parseInt(process.env.ARGON2_MEMORY_COST, 10),
          timeCost: parseInt(process.env.ARGON2_TIME_COST, 10),
          parallelism: parseInt(process.env.ARGON2_PARALLELISM, 10)
        }
        const newHash = await argon2.hash(password, argon2Config)

        // 2. Save the re-hash
        try {
          await client.query(`UPDATE users SET aegis = $1 WHERE email=$2`, [newHash, email])
        } catch (err) {
          throw err
        }

        // 3. Generate access token and refresh token
        try {
          const theKey = process.env.PASETO_SECRET_KEY
          const accessToken = await V4.sign({ sub: user.rows[0].user_code, suspended: false }, theKey, { expiresIn: "5 seconds" })
          const refreshToken = await V4.sign({ sub: user.rows[0].user_code, suspended: false }, theKey, { expiresIn: "72 hours" })

          // 4. Hash refresh token
          const hashedRefreshToken = await argon2.hash(refreshToken, argon2Config)
          console.log("RT :", refreshToken)
          console.log("Hashed RT :", hashedRefreshToken)

          // 5. Update hashed_rt in the database
          try {
            await client.query(`UPDATE users SET hashed_rt=$1 WHERE email=$2`, [hashedRefreshToken, email])
          } catch (err) {
            throw err
          }

          // 6.Set refresh token in a httpOnly cookie
          console.log("Are we reaching here?")
          res
            .cookie("refreshYO", refreshToken, {
              httpOnly: true, //Prevents access via JavaScript
              secure: true,
              // secure: process.env.NODE_ENV === "production", // Ensures it's only sent over HTTPS
              sameSite: "Lax", // Prevents CSRF attacks
              maxAge: 72 * 60 * 60 * 1000 // Matches the token expiration (72 hours)
            })

            // 7. Send response
            .status(200)
            .json({ dbSays: "LOGGED_IN", at: accessToken })
        } catch (err) {
          throw new Error("TOKEN_GENERATION_FAILED")
        }
      } else {
        // False : Password did not match
        throw new Error("WRONG_PASSWORD")
      }
    } catch (innerErr) {
      throw innerErr
    } finally {
      if (client) client.release()
    }
  } catch (err) {
    switch (err.message) {
      case "FORM_NOT_FILLED":
      case "USER_NOT_FOUND":
      case "WRONG_PASSWORD":
        res.status(400).json({ dbSays: err.message })
        break
      case "FORBIDDEN":
        res.status(403).json({ dbSays: err.message })
        break
      case "TOKEN_GENERATION_FAILED":
        res.status(500).json({ dbSays: "SERVER_ERROR" })
        break
      default:
        res.status(500).json({ dbSays: "SERVER_ERROR" })
    }
    console.log("db🧨", err)
  }
}
