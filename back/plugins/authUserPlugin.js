import fp from "fastify-plugin"
import { verifyAccessToken } from "../helpers/verifyAccessToken.js"

export const authUserPlugin = fp(async (fastify, options) => {
  fastify.decorate("authUser", async (request, reply) => {
    console.log("🌞🌞🌞authUserPlugin running. The header?", request.headers)
    const { at } = request.headers // "Bearer undefined (typeof "string")" if absent.
    if (!at?.startsWith("Bearer ")) throw new Error("ERR_INVALID_AT_HEADER")
    if (at === "Bearer undefined") throw new Error("ERR_NO_AT")

    const clientAt = at.split(" ")[1]

    const obj = await verifyAccessToken(clientAt) //returns {userCode} or throws ERR codes.
    console.log("🌞🌞🌞obj : ", obj)

    request.payload = obj //{ userCode, tokenType: "AT", guardHash: config.guardHash.at }
  })
})
