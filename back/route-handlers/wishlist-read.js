import pg from "pg"
import { config } from "../config.js"

const pool = new pg.Pool(config.db)

export const wishlistRead = async (request, resply) => {
  let client
  console.log("request.body", request.body)
  console.log("request.body", request.body.id, request.body.serialNumber)
  const { id, serialNumber } = request.body
  try {
    client = await pool.connect()
    const data = await client.query(`SELECT id, serial_number, is_primary, list_data, list_name FROM wishlists WHERE ref_user_id = $1`, [id])
    console.log("data.rows", data.rows)
    resply.send(data.rows)
  } catch (err) {
  } finally {
    if (client) client.release()
  }
}

// SELECT
//     w.data->>'productId' AS product_id,
//     w.data->>'comment' AS comment,
//     w.data->>'added_at' AS added_at,
//     p.title_en,
//     p.title_jp,
//     p.current_price
// FROM
//     wishlists w
// JOIN
//     videos v
// ON
//     (w.data->>'productId')::UUID = v.id
// WHERE
//     w.ref_user_id = :user_id
// ORDER BY
//     w.data->>'added_at' DESC;
