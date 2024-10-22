import pg from "pg"

const pool = new pg.Pool({
  user: process.env.USER,
  password: process.env.PASS,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DBPORT
})

export async function readVid001(req, res) {
  try {
    const client = await pool.connect()
    try {
      const resDB = await client.query(`SELECT * FROM videos`)
      res.json(resDB.rows)
    } catch (errDB) {
      console.log("errDB🧨", errDB)
    } finally {
      client.release()
    }
  } catch (errConnection) {
    console.log("errConnection🧨", errConnection)
  }
}
