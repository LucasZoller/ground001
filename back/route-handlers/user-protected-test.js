import pg from "pg"
import { config } from "../config.js"

const pool = new pg.Pool(config.db)

export const userProtectedTest = async (request, reply) => {
  console.log("🎁🎁🎁Actual contents of userProtectedTest🎁🎁🎁")
  const { userCode } = request.user

  let client
  try {
    client = await pool.connect()
    console.log("Total clients in the pool:", pool.totalCount)
    console.log("Idle clients in the pool:", pool.idleCount)
    console.log("Waiting requests for a client:", pool.waitingCount)
    const user = await client.query(
      `
        SELECT lang, user_name, email, created_at, last_modified_at, suspended, hashed_rt FROM users WHERE user_code=$1
        `,
      [userCode]
    )

    if (user.rows.suspended === true) {
      await client.query(`UPDATE users SET hashed_rt = $1 WHERE email=$2`, ["", email]) // Clear suspended user's rt
      throw new Error("ERR_FORBIDDEN")
    }

    console.log("user.rows : ", user.rows)
    console.log("user.rows[0] : ", user.rows[0])
    const data = {
      status: "LOGGED_IN",
      message: "🎊🎊🎊Successfully logged in! Welcome🎊🎊🎊",
      user_code: userCode,
      lang: user.rows[0].lang,
      user_name: user.rows[0].user_name,
      email: user.rows[0].email,
      created_at: user.rows[0].created_at,
      last_modified_at: user.rows[0].last_modified_at,
      hashed_rt: user.rows[0].hashed_rt
    }
    return reply.code(200).send(data)
  } finally {
    if (client) client.release()
  }
}
