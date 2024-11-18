import { V4 } from "paseto"
import { config } from "../config.js"

export const verifyAccessToken = async at => {
  let decoded
  let result
  try {
    decoded = await V4.verify(at, config.pasetoKeys.public.at)
    console.log("🎑🎑🎑🎑🎑Successfully decoded! : ", decoded)
    result = { userCode: decoded.sub, tokenType: "AT", guardHash: config.guardHash.at }
  } catch (err) {
    if (err.code === "ERR_PASETO_CLAIM_INVALID") throw new Error("ERR_AT_EXPIRED", { cause: err })
    // Expired AT should not exist in the browser. Highly suspicious.
    throw new Error("ERR_INVALID_AT", { cause: err })
  }

  return result
}
