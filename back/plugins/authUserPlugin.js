import fp from "fastify-plugin"

import { verifyAccessToken } from "../helpers/verifyAccessToken.js"
import { verifyRefreshToken } from "../helpers/verifyRefreshToken.js"

export const authUserPlugin = fp(async (fastify, options) => {
  fastify.decorate("authUser", async (request, reply) => {
    console.log("🥭🥭🥭Am I running?")
    const at = request.headers["at"] // AT from the frontend
    const rt = request.headers["rt"] // RT from the frontend
    console.log("🥭🥭🥭Is at and rt successfully acquired??", at, rt)
    if (!rt) throw new Error("ERR_NO_RT_HEADERS") // This check has already been done by the frontend.

    let obj

    if (at) {
      console.log("🦄🦄🦄AT route in the authUserPlugin has fired")
      if (!at.startsWith("Bearer ")) throw new Error("ERR_INVALID_RT_HEADER")
      const clientAt = at.split(" ")[1]
      // Send AT to verify user
      try {
        console.log(
          "🦄🦄🦄TRY AT route in the authUserPlugin has fired. the AT is :",
          clientAT
        )
        obj = await verifyAccessToken(clientAt) //returns {userCode}
        console.log(
          "🦄🦄🦄TRY AT END route in the authUserPlugin has fired : obj : ",
          obj
        )
      } catch (err) {
        //Should we use RT? Ending up here is highly suspicious.
        console.log(
          "🦄🦄🦄CATCH ERR AT route in the authUserPlugin has fired : clientRt : ",
          rt.split(" ")[1]
        )
        const clientRt = rt.split(" ")[1]
        obj = await verifyRefreshToken(clientRt) //returns { userCode, at, atExpInBase64Url, atMaxAge, rawRt, rtExpInBase64Url, rtMaxAge,  }
      }
    } else {
      // Send RT to verify user
      console.log("🦄🦄🦄RT route in the authUserPlugin has fired")
      const clientRt = rt.split(" ")[1]
      obj = await verifyRefreshToken(clientRt) //returns { userCode, at, atExpInBase64Url, atMaxAge, rawRt, rtExpInBase64Url, rtMaxAge,  }
      console.log(
        "🦄🦄🦄RT route in the authUserPlugin has fired and come to end : ",
        obj
      )
    }

    request.payload = {
      userCode: obj?.userCode,
      at: obj?.at,
      atExp: obj?.atExpInBase64Url, // We want to exclude this line
      atExpInSec: obj?.atMaxAge,
      rt: obj?.rawRt,
      rtExp: obj?.rtExpInBase64Url, // We want to exclude this line
      rtExpInSec: obj?.rtMaxAge,
    }
  })
})
