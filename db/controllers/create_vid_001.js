import pg from "pg"

const pool = new pg.Pool({
  user: process.env.USER,
  password: process.env.PASS,
  host: process.env.HOST,
  database: process.env.DB,
  port: process.env.DBPORT
})

export async function createVid001(req, res) {
  try {
    const {
      product_number,
      published,
      title_ja,
      title_en,
      cover_url,
      img_url,
      txt_ja,
      txt_en,
      duration_min,
      duration_sec,
      price,
      vid_url_240p,
      vid_url_480p,
      vid_url_720p,
      sample_url_240p,
      sample_url_480p,
      sample_url_720p
    } = req.body.vidProp

    const createdAt = new Date().toISOString()
    const modifiedAt = new Date().toISOString()
    const duration = `${duration_min} minutes ${duration_sec} seconds`
    const imgUrlNoEmptyStrings = img_url.filter(element => element !== "")

    const values = [
      product_number,
      published,
      createdAt,
      modifiedAt,
      title_ja,
      title_en,
      cover_url,
      imgUrlNoEmptyStrings,
      txt_ja,
      txt_en,
      duration,
      price,
      vid_url_240p,
      vid_url_480p,
      vid_url_720p,
      sample_url_240p,
      sample_url_480p,
      sample_url_720p
    ]

    const client = await pool.connect()
    try {
      await client.query(
        `INSERT INTO videos(
            product_number,
            published,
            created_at,
            last_modified_at,
            title_ja,
            title_en,
            cover_url,
            img_url,
            txt_ja,
            txt_en,
            duration,
            price,
            vid_url_240p,
            vid_url_480p,
            vid_url_720p,
            sample_url_240p,
            sample_url_480p,
            sample_url_720p)
        VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18)`,
        values
      )
    } catch (errDB) {
      console.log("errDB🧨", errDB)
    } finally {
      client.release()
    }
  } catch (errConnection) {
    console.log("errConnection🧨", errConnection)
  }
}
