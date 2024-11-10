import fp from "fastify-plugin"

import { verifyAccessToken } from "../helpers/verifyAccessToken.js"
import { verifyRefreshToken } from "../helpers/verifyRefreshToken.js"

export const authUserPlugin = fp(async (fastify, options) => {
  fastify.decorate("authUser", async (request, reply) => {
    console.log("🥭🥭🥭Am I running?")
    const at = request.headers["at"] // AT from the frontend
    const rt = request.headers["rt"] // RT from the frontend

    if (!rt) throw new Error("ERR_NO_RT_HEADERS") // This check has already been done by the frontend.

    let obj

    if (at) {
      if (!at.startsWith("Bearer ")) throw new Error("ERR_INVALID_RT_HEADER")
      const clientAt = at.split(" ")[1]
      // Send AT to verify user
      try {
        obj = await verifyAccessToken(clientAt) //returns {userCode}
      } catch (err) {
        //Should we use RT? Ending up here is highly suspicious.
        const clientRt = rt.split(" ")[1]
        obj = await verifyRefreshToken(clientRt) //returns { userCode, at, atExpInBase64Url, atMaxAge, rawRt, rtExpInBase64Url, rtMaxAge,  }
      }
    } else {
      // Send RT to verify user
      const clientRt = rt.split(" ")[1]
      obj = await verifyRefreshToken(clientRt) //returns { userCode, at, atExpInBase64Url, atMaxAge, rawRt, rtExpInBase64Url, rtMaxAge,  }
    }

    request.payload = {
      userCode: obj?.userCode,
      at: obj?.at,
      atExp: obj?.atExpInBase64Url,
      atExpInSec: obj?.atMaxAge,
      rt: obj?.rawRt,
      rtExp: obj?.rtExpInBase64Url,
      rtExpInSec: obj?.rtMaxAge
    }
  })
})
