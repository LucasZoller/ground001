import pg from "pg"

const pool = new pg.Pool({
  user: process.env.USER,
  password: process.env.PASS,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DBPORT
})

export async function searchVid001(req, res) {
  const { searchTerm } = req.body
  console.log("searchCollection triggered", searchTerm)
  try {
    const client = await pool.connect()
    try {
      const resDB = await client.query(
        `
        SELECT * FROM videos 
        WHERE product_number ILIKE $1 OR title_ja ILIKE $1
        `,
        [`%${searchTerm}%`]
      )
      console.log(resDB.rows)
      res.json(resDB.rows)
    } catch (errDB) {
      console.log("DB🧨", errDB)
    } finally {
      client.release()
    }
  } catch (errConnection) {
    console.log("Connection🧨", errConnection)
  }
}
