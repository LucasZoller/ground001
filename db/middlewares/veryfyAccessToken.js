import { V4 } from "paseto"

export const verifyAccessToken = async (req, res, next) => {
  try {
    const headers = req.headers["authorization"] // Access Token from the frontend

    if (!headers) throw new Error("NO_HEADERS")
    if (!headers.startsWith("Bearer ")) throw new Error("INVALID_HEADER")

    const theKey = process.env.PASETO_PUBLIC_KEY
    const token = headers.split(" ")[1]

    let decoded
    try {
      decoded = await V4.verify(token, theKey)
    } catch (err) {
      if (err.code === "ERR_PASETO_CLAIM_INVALID") {
        //return res.status(401).send("ACCESS_TOKEN_EXPIRED")
        throw new Error("ACCESS_TOKEN_EXPIRED")
      }
      throw new Error("INVALID_TOKEN")
    }

    req.user = { userCode: decoded.sub }
    next()
  } catch (err) {
    switch (err.message) {
      case "NO_HEADERS":
      case "INVALID_HEADER":
      case "INVALID_TOKEN":
      case "ACCESS_TOKEN_EXPIRED":
        console.log("🧨", err.message)
        return res.status(400).send(err.message)

      default:
        return res.status(500).send("SERVER_ERROR")
    }
  }
}
