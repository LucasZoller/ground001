import { config } from "../config.js"
import ms from "ms"

export const generateRandomStringHelper = () => {
  // This helper function creates a random string of arbitrary number of characters.

  const howLong = 16 // Currently, it is 16.
  const choices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let string = ""
  for (let i = 0; i < howLong; i++) {
    const randomIndex = Math.floor(Math.random() * choices.length)
    string += choices.charAt(randomIndex)
  }
  return string
}

export const generateBase64FromTimeStamp = timestamp => {
  let timestampInMs = ""
  if (!timestamp) timestampInMs = Date.now() // Current timestamp in milliseconds
  else timestampInMs = new Date(timestamp).getTime().toString() // Converts timestamp to milliseconds

  const timeStampInBase64 = Buffer.from(timestampInMs).toString("base64") // Convert to Base64
  return timeStampInBase64
}

export const convertExpirationTimestampToCookieMaxAge = timestamp => {
  const msConversion = new Date(timestamp).getTime()
  const currentTime = Date.now() //
  const maxAge = Math.floor((msConversion - currentTime) / 1000) // Calculate maxAge in seconds and round it
  return maxAge
}
