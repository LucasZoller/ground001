import pg from "pg"
import { config } from "../config.js"

const pool = new pg.Pool(config.db)

export const accountItems = async (request, reply) => {
  const { userCode, tokenType, guardHash } = request.payload //{ userCode, tokenType: "RT", guardHash: config.guardHash.rt }

  if (tokenType !== "AT") throw new Error("ERR_INVALID_PAYLOAD")
  if (guardHash !== config.guardHash.at) throw new Error("ERR_GUARD_BLOCK")

  let client
  try {
    client = await pool.connect()
    const user = await client.query(
      `
        SELECT lang, user_name, email, cart, created_at, last_modified_at, suspended FROM users WHERE user_code=$1
        `,
      [userCode]
    )

    if (user.rows.suspended === true) {
      await client.query(`UPDATE users SET hashed_rt = $1 WHERE email=$2`, [
        "",
        email,
      ]) // Clear suspended user's rt
      throw new Error("ERR_FORBIDDEN")
    }

    console.log("user.rows : ", user.rows)
    console.log("user.rows[0] : ", user.rows[0])

    const data = {
      verified: true,
      userCode,
      protected: {
        message: "🌚Array of purchased items from the database🌝",
      },
    }
    return reply.code(200).send(data)
  } finally {
    if (client) client.release()
  }
}
