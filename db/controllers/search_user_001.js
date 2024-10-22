import pg from "pg"

const pool = new pg.Pool({
  user: process.env.USER,
  password: process.env.PASS,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DBPORT
})

export async function searchUser001(req, res) {
  const { searchTerm } = req.body
  try {
    const client = await pool.connect()
    try {
      const resDB = await client.query(
        `
        SELECT * FROM users 
        WHERE user_code ILIKE $1 OR user_name ILIKE $1 OR email ILIKE $1
        `,
        [`%${searchTerm}%`]
      )
      console.log(resDB.rows)
      res.status(200).json(resDB.rows)
    } catch (errDB) {
      console.error("DB🧨", errDB)
      res.status(500).json({ dbSays: "🧨Database error🧨" })
    } finally {
      client.release()
    }
  } catch (errConnection) {
    console.log("Connection🧨", errConnection)
    res.status(500).json({ dbSays: "🧨Connection error🧨" })
  }
}
