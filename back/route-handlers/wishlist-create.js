import pg from "pg"
import { config } from "../config.js"

const pool = new pg.Pool(config.db)

export const wishlistCreate = async (request, reply) => {
  console.log("🌚🌷", request.body)
  let client
  try {
    client = await pool.connect()

    const { id, ...nameAndData } = request.body // id, list_name, list_data

    // Check if user already has 5 wishlists...
    const wishlistCount = await client.query(
      `
          SELECT COUNT(*)
          FROM wishlists
          WHERE ref_user_id = $1;
          `,
      [id]
    )
    if (wishlistCount.rows[0].count >= 5) throw new Error("ERR_MAX_WISHLIST_COUNT_REACHED")
    const isPrimaryBool = parseInt(wishlistCount.rows[0].count) === 0 // True if no wishlist was found.

    // Find the next available serial_number...
    const availableNextNumber = await client.query(
      `
          SELECT serial_number
          FROM generate_series(1, 5) AS serial_number
          WHERE serial_number NOT IN (
              SELECT serial_number FROM wishlists WHERE ref_user_id = $1
          )
          LIMIT 1;
      `,
      [id]
    )
    console.log("🌸availableNextNumber", availableNextNumber)
    console.log("🌸nameAndData", nameAndData)
    Object.keys(nameAndData).forEach(key => {
      if (nameAndData[key] === undefined) delete nameAndData[key]
    })

    const objKeys = Object.keys(nameAndData) // Array of all keys
    const objValues = Object.values(nameAndData) // Arrays of all values
    console.log("💐objKeys", objKeys)
    console.log("💐objValues", objValues)
    // Create the dynamic part of the query only if `namaAndData` is not empty.
    const dynamicColumns = objKeys.length > 0 ? `, ${objKeys.join(", ")}` : ""
    console.log("☘dynamicColumns", dynamicColumns)
    const dynamicPlaceholders = objValues.length > 0 ? `, ${objValues.map((_, i) => `$${4 + i}`).join(", ")}` : ""

    const query = `
            INSERT INTO wishlists (ref_user_id, serial_number, is_primary${dynamicColumns})
            VALUES ($1, $2, $3${dynamicPlaceholders}) RETURNING *
              `
    const values = [id, availableNextNumber.rows[0].serial_number, isPrimaryBool].concat(Object.values(nameAndData))
    console.log("☘query", query)
    console.log("☘values", values)
    try {
      const result = await client.query(query, values)
      console.log("🎍result", result)
      reply.code(200).send({ listName: result.rows[0].list_name })
    } catch (err) {
      console.log(err)
    }
  } catch (err) {
  } finally {
    if (client) client.release()
  }
}
