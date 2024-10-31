export const base64StringToNumberConverter = (base64: string): number => {
  //Data sent through URL or cookies, special characters
  //in Base64 strings (such as +, /, and =) can get URL-encoded
  //into %2B, %2F, and %3D, respectively.
  if (!base64 || typeof base64 !== "string") {
    console.log("Invalid input: Base64 string is empty or not a string.")
    throw new Error("ERR_BASE64_DECODING_FAILED")
  }
  try {
    // 1: URL decode the Base64 string
    const decodedUrlEncoded = decodeURIComponent(base64)

    // 2: Use `atob` to decode the Base64 string
    const base64Decoded = atob(decodedUrlEncoded)

    // 3: Convert the string back to a number
    const resultingNumber = parseInt(base64Decoded, 10)

    // 4: Check if `parseInt` returned a valid number
    if (isNaN(resultingNumber)) {
      console.log("Decoded Base64 string is not a valid number.")
      throw new Error("ERR_BASE64_DECODING_FAILED")
    }

    return resultingNumber
  } catch (err) {
    console.log("💤💤💤Error from base64StringToNumberConverter : ", err)
    throw new Error("ERR_BASE64_DECODING_FAILED")
  }
}

export const cookieValueExtractor = (cookieName: string): string => {
  // 1: Take all the cookies as a singel string and convert it into an array.
  const cookiesArray = document.cookie.split(";")

  // 2: Find the cookie in the cookies array.
  const cookiePair = cookiesArray.find((c) => c.startsWith(cookieName))

  // 3: If NOT found, throw error code.
  if (!cookiePair) throw new Error("ERR_COOKIE_NOT_FOUND")

  // 4: If found, extract only the value of the cookie.
  const cookieValue = cookiePair.split("=")[1]

  return cookieValue
}
