import fp from "fastify-plugin"
import { V4 } from "paseto"
import { config } from "../config.js"

export const verifyAccessTokenPlugin = fp(async (fastify, options) => {
  fastify.decorate("verifyAccessToken", async (request, reply) => {
    const headers = request.headers["authorization"] // Access Token from the frontend

    if (!headers) throw new Error("ERR_NO_HEADERS")
    if (!headers.startsWith("Bearer ")) throw new Error("ERR_INVALID_HEADER")

    const atFromHeader = headers.split(" ")[1]

    let decoded
    try {
      decoded = await V4.verify(atFromHeader, config.pasetoKeys.public.at)
    } catch (err) {
      if (err.code === "ERR_PASETO_CLAIM_INVALID") throw new Error("ERR_AT_EXPIRED", { cause: err })

      throw new Error("ERR_INVALID_AT", { cause: err })
    }
    console.log("🎑🎑🎑🎑🎑Successfully decoded! : ", decoded)
    request.user = { userCode: decoded.sub }
  })
})
