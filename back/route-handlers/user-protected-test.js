import pg from "pg"
import { config } from "../config.js"

const pool = new pg.Pool(config.db)

export const userProtectedTest = async (request, reply) => {
  console.log("🎁🎁🎁Actual contents of userProtectedTest🎁🎁🎁")
  console.log("🌛🌛🌛This is the request from the protected route. What shape is this? : ", request.payload)
  const { userCode } = request.payload

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

    // request.payload = {
    //   userCode: obj?.userCode,
    //   at: obj?.at,
    //   atExp: obj?.atExpInBase64Url,
    //   atExpInSec: obj?.atMaxAge,
    //   rt: obj?.rawRt,
    //   rtExp: obj?.rtExpInBase64Url,
    //   rtExpInSec: obj?.rtMaxAge
    // }
    const data = {
      basics: {
        user_code: userCode,
        user_name: user.rows[0].user_name,
        lang: user.rows[0].lang,
        email: user.rows[0].email,
        created_at: user.rows[0].created_at,
        last_modified_at: user.rows[0].last_modified_at,
        at: request.payload.at,
        atExp: request.payload.atExp,
        atExpInSec: request.payload.atExpInSec,
        rt: request.payload.rt,
        rtExp: request.payload.rtExp,
        rtExpInSec: request.payload.rtExpInSec
      },
      routeSpecific: { message: "🎊🎊🎊Successfully logged in! Welcome🎊🎊🎊" }
    }
    return reply.code(200).send(data)
  } finally {
    if (client) client.release()
  }
}
