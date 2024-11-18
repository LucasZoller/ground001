import fp from "fastify-plugin"
import pg from "pg"
import { config } from "../config.js"
import { verifyAccessToken } from "../helpers/verifyAccessToken.js"
import { verifyRefreshToken } from "../helpers/verifyRefreshToken.js"

export const authUserPlugin = fp(async (fastify, options) => {
  fastify.decorate("authUser", async (request, reply) => {
    console.log("🥭🥭🥭Am I running?")
    console.log("🥭🥭🥭The shape of the whole header?", request.headers)
    const { at, rt } = request.headers // "Bearer undefined (typeof "string")" if absent.
    if (!at.startsWith("Bearer ")) throw new Error("ERR_INVALID_AT_HEADER")
    if (!rt.startsWith("Bearer ")) throw new Error("ERR_INVALID_RT_HEADER")

    let obj
    console.log("🥭🥭🥭🥭🥭🥭CHECK TYPE OF AT : ", typeof at)
    console.log("🥭🥭🥭🥭🥭🥭CHECK WHAT STRING IS AT : ", at)
    if (at !== "Bearer undefined") {
      console.log("🦄🦄🦄AT route in the authUserPlugin has fired")

      const clientAt = at.split(" ")[1]
      // Send AT to verify user
      try {
        obj = await verifyAccessToken(clientAt) //returns {userCode}
        console.log("🦄🦄🦄TRY AT END route in the authUserPlugin has fired : obj : ", obj)
      } catch (err) {
        //Should we use RT? Ending up here is highly suspicious.
        console.log("🦄🦄🦄CATCH ERR AT route in the authUserPlugin has fired : clientRt : ", rt.split(" ")[1])
        //const clientRt = rt.split(" ")[1]
        //obj = await verifyRefreshToken(clientRt) //returns { userCode, at, atExpInBase64Url, atMaxAge, rawRt, rtExpInBase64Url, rtMaxAge,  }
      }
    } else {
      // Send RT to verify user
      console.log("🦄🦄🦄RT route in the authUserPlugin has fired")
      const clientRt = rt.split(" ")[1]

      obj = await verifyRefreshToken(clientRt) //returns { userCode, at, atExpInBase64Url, atMaxAge, rawRt, rtExpInBase64Url, rtMaxAge,  }
      console.log("🦄🦄🦄RT route in the authUserPlugin has fired and come to end : ", obj)
    }

    request.payload = obj //{ userCode, tokenType: "RT", guardHash: config.guardHash.rt }
  })
})
