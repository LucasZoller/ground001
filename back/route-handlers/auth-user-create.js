import pg from "pg"
import argon2, { argon2id } from "argon2"
import { V4 } from "paseto"
import { config } from "../config.js"
import {
  generateRandomStringHelper,
  convertExpirationTimestampToCookieMaxAge,
  generateBase64FromTimeStamp,
} from "../helpers/stringHelpers.js"

const pool = new pg.Pool(config.db)

export const authUserCreate = async (request, reply) => {
  let client // finally-block cannot access any variable declared inside the try-block.
  try {
    client = await pool.connect()

    // Check if the email already exists in the database.
    const { email } = request.body
    const checkEmail = await client.query(
      `SELECT 1 FROM users WHERE email=$1 LIMIT 1`,
      [email]
    )
    if (checkEmail.rows.length > 0) {
      throw new Error("ERR_EMAIL_EXISTS") //Break out from the try block immediately.
    }

    // Email is good. Now, create a unique user code.

    let code16, emptyIfUnique
    do {
      // Anything inside do{} runs at least once.
      code16 = generateRandomStringHelper()
      emptyIfUnique = await client.query(
        `SELECT 1 FROM users WHERE user_code = $1 LIMIT 1`,
        [code16]
      )
    } while (emptyIfUnique.rows.length > 0)

    // Create hashed password using Argon2id
    const { password } = request.body

    let tempHashedPassword
    try {
      tempHashedPassword = await argon2.hash(password, config.argon2)
    } catch (err) {
      throw new Error("ERR_PASSWORD_HASHING_FAILED", { cause: err })
    }
    const hashedPassword = tempHashedPassword

    //Create refresh token from userCode
    const userCode = code16
    let tempAt, tempRawRt, tempHashedRt, tempAtDecodedObj, tempRtDecodedObj
    try {
      tempAt = await V4.sign({ sub: userCode }, config.pasetoKeys.secret.at, {
        expiresIn: config.expiration.paseto.at,
      })
      tempRawRt = await V4.sign(
        { sub: userCode },
        config.pasetoKeys.secret.rt,
        { expiresIn: config.expiration.paseto.rt }
      )
      tempAtDecodedObj = await V4.verify(tempAt, config.pasetoKeys.public.at)
      tempRtDecodedObj = await V4.verify(tempRawRt, config.pasetoKeys.public.rt)
      tempHashedRt = await argon2.hash(tempRawRt, config.argon2)
    } catch (err) {
      throw new Error("ERR_TOKEN_GENERATION_FAILED", { cause: err })
    }
    const atExpTimestamp = tempAtDecodedObj.exp // Timestamp e.g 2024-09-30T10:01:47.201Z
    const rtExpTimestamp = tempRtDecodedObj.exp // Timestamp e.g 2024-10-03T10:01:42.203Z
    const atExp = new Date(atExpTimestamp).getTime() // Milliseconds
    const rtMaxAge = convertExpirationTimestampToCookieMaxAge(rtExpTimestamp)
    // Insert user into database
    const { lang } = request.body
    const at = tempAt
    const rawRt = tempRawRt
    const hashedRt = tempHashedRt
    const userName = "user_" + code16
    const suspended = false
    const createdAt = new Date().toISOString()
    const modifiedAt = new Date().toISOString()
    const cartItems = [""]
    const values = [
      userCode,
      lang,
      userName,
      email,
      hashedPassword,
      hashedRt,
      createdAt,
      modifiedAt,
      suspended,
      cartItems,
    ]
    await client.query(
      `INSERT INTO users(
        user_code, lang, user_name, email, aegis, hashed_rt, created_at, last_modified_at, suspended, cart
        ) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
         ON CONFLICT (user_code) DO NOTHING`,
      values
    )
    // Successful response
    // Set refresh token in a httpOnly cookie
    const rtExpInBase64Code = generateBase64FromTimeStamp(rtExpTimestamp)
    return (
      reply
        .setCookie("cltoken", rawRt, {
          path: "/",
          httpOnly: true, //Prevents access via JavaScript
          secure: process.env.NODE_ENV === "production", // Ensures it's only sent over HTTPS
          sameSite: "Lax", // Prevents CSRF attacks
          maxAge: rtMaxAge, // Seconds. NOT milliseconds.
        })
        .setCookie("site-session", rtExpInBase64Code, {
          path: "/",
          httpOnly: false, // Accessible to JavaScript
          secure: true, // Send only over HTTPS (set to false for local dev)
          sameSite: "Strict",
          maxAge: rtMaxAge, // Seconds. NOT milliseconds.
        })
        // Send response
        .code(200)
        .send({ at, atExp, userName, cartItems, lang })
    )
  } finally {
    if (client) {
      client.release()
    }
  }
}
