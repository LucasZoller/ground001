import pg from "pg"

const pool = new pg.Pool({
  user: process.env.USER,
  password: process.env.PASS,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DBPORT
})

export async function editVid001(req, res) {
  if (!req.body || !req.body.vidProp) {
    return res.status(400).send("Invalid input: vidProp is required")
  } else if (!req.body.vidProp.product_number) {
    return res.status(400).send("Invalid input: Didn't receive product number")
  } else {
    const modifiedAt = new Date().toISOString()
    let code, data

    if (req.body.vidProp.duration_min && req.body.vidProp.duration_sec) {
      const { product_number, duration_min, duration_sec, ...vidProp } = req.body.vidProp
      // Only extracts product_number, duration_min, duration_sec, and assign the remaining elements of the object into vidProp
      const duration = `${duration_min} minutes ${duration_sec} seconds`
      code = product_number
      data = { ...vidProp, duration, last_modified_at: modifiedAt }
    } else {
      const { product_number, ...vidProp } = req.body.vidProp //No duration data was provided
      code = product_number
      data = { ...vidProp, last_modified_at: modifiedAt }
    }
    console.log("In the middle of the codes...👓", code)
    const buildQueryParts = (code, data) => {
      const setClauses = []
      const values = []
      let counter = 1
      for (const [column, value] of Object.entries(data)) {
        // Object.entries(something) returns an array of [key, value] pairs from the "something" object.
        // "column" becomes key, and "value" becomes value.
        setClauses.push(`${column}=$${counter}`)
        values.push(value)
        counter++
      }
      const theClause = setClauses.join(", ") // This will turn the whole array into a single string
      values.push(code) //Manually adding id at the end of the array

      const query = `UPDATE videos SET ${theClause} WHERE product_number = $${counter}`
      return { query, values }
    }

    const { query, values } = buildQueryParts(code, data)

    try {
      const client = await pool.connect()
      try {
        await client.query(query, values)
        res.status(200).json({ dbSays: "🎊Update successful🎊" })
      } catch (errDB) {
        console.error("errDB🧨", errDB)
        res.status(500).json({ dbSays: "🧨Database error🧨" })
      } finally {
        client.release()
      }
    } catch (errConnection) {
      console.error("errConnection🧨", errConnection)
      res.status(500).json({ dbSays: "🧨Connection error🧨" })
    }
  }
}
