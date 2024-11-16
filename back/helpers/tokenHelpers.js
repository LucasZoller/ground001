import { V4 } from "paseto"
import { config } from "../config.js"
import {
  convertExpirationTimestampToCookieMaxAge,
  generateBase64FromTimeStamp,
} from "./stringHelpers.js"

export const generateMaxAgeAndTimestampInMsFromPasetoTokenHelper = async (
  pasetoAT,
  pasetoRt
) => {
  const pasetoAtDecodedObj = await V4.verify(
    pasetoAT,
    config.pasetoKeys.public.at
  )
  const pasetoRtDecodedObj = await V4.verify(
    pasetoRt,
    config.pasetoKeys.public.rt
  )

  console.log(
    "From the token helper. What is the shape of the decoded object? : ",
    pasetoRtDecodedObj
  )
  //process AT
  const atExpTimestamp = pasetoAtDecodedObj.exp // Timestamp e.g 2024-09-30T10:01:47.201Z
  const atMaxAge = convertExpirationTimestampToCookieMaxAge(atExpTimestamp) // Output in seconds
  const atExpInBase64Url = generateBase64FromTimeStamp(atExpTimestamp) // Base64Url format

  //process RT
  const rtExpTimestamp = pasetoRtDecodedObj.exp // Timestamp e.g 2024-10-03T10:01:42.203Z
  const rtMaxAge = convertExpirationTimestampToCookieMaxAge(rtExpTimestamp) // Output in seconds
  const rtExpInBase64Url = generateBase64FromTimeStamp(rtExpTimestamp) // Base64Url format

  return { atMaxAge, atExpInBase64Url, rtMaxAge, rtExpInBase64Url }
}
