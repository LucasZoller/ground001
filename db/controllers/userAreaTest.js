import pg from "pg"

const pool = new pg.Pool({
  user: process.env.USER,
  password: process.env.PASS,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DBPORT
})

export async function userAreaTest(req, res) {
  console.log("actual contents of userArea🎁")
  const { userCode } = req.user

  try {
    const client = await pool.connect()
    try {
      const user = await client.query(
        `
        SELECT lang, user_name, email, created_at, last_modified_at, suspended, hashed_rt FROM users WHERE user_code=$1
        `,
        [userCode]
      )

      if (user.rows.suspended === true) {
        // Do the following if this user is suspended
        if (user.rows[0].hashed_rt) {
          try {
            await client.query(`UPDATE users SET hashed_rt = $1 WHERE email=$2`, ["", email])
          } catch (err) {
            throw err
          } // Clear suspended user's rt if it exists
        }
        res.status(403).json({ status: "SUSPENDED", message: "Your account is suspended." }) // Block suspended user immediately
      }
      console.log("user.rows : ", user.rows)
      console.log("user.rows[0] : ", user.rows[0])
      const data = {
        status: "LOGGED_IN",
        message: "Successfully logged in! Welcome🎊",
        user_code: userCode,
        lang: user.rows[0].lang,
        user_name: user.rows[0].user_name,
        email: user.rows[0].email,
        created_at: user.rows[0].created_at,
        last_modified_at: user.rows[0].last_modified_at,
        hashed_rt: user.rows[0].hashed_rt
      }
      res.status(200).json(data)
    } catch (err) {
      console.log("database error🧨", err)
      res.status(500).json({ message: "Server error🎡" })
    } finally {
      client.release()
    }
  } catch (err) {
    console.log("connection error🧨", err)
    res.status(500).json({ message: "Server error" })
  }
}
