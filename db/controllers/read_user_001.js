import pg from "pg"

const pool = new pg.Pool({
  user: process.env.USER,
  password: process.env.PASS,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DBPORT
})

export async function readUser001(req, res) {
  try {
    const client = await pool.connect()
    try {
      const resDB = await client.query(`SELECT * FROM users`)
      res.status(200).json(resDB.rows)
    } catch (errDB) {
      console.log("errDB🧨", errDB)
      res.status(500).json({ dbSays: "🧨Database error🧨" })
    } finally {
      client.release()
    }
  } catch (errConnection) {
    console.log("errConnection🧨", errConnection)
    res.status(500).json({ dbSays: "🧨Connection error🧨" })
  }
}
