import paseto from "paseto"

const { V4 } = paseto

// Create new ECC (type of crypto) keys in 2 ways.

// Option 1. Output: KeyObject.
// Better security practices by minimizing direct string-based key storage
const testPaseto1 = await V4.generateKey("public", { format: "keyobject" })

// Option 2. Output: { publicKey: string, secretKey: string }.
// Perfect for .env file
const testPaseto2 = await V4.generateKey("public", { format: "paserk" })

// Option 3. Use Option 1 and Node function to generate string key.
const inByteFormat = V4.keyObjectToBytes(newSecretKey) // inByteFormat is a byte array
const newSecretKeyInHexString = Buffer.from(inByteFormat).toString("hex")

console.log("Look at the newly created Public Key!🎉", newSecretKeyInHexString)

// Store this newSecretKeyInHexString in the `.env` file.

// Now, to go back from hexString to the original key:
const pasetoKey = process.env.PASETO_PRIVATE_KEY
const pasetoKeyInBytes = Buffer.from(pasetoKey, "hex") // Convert the hex string back to a byte array
const pKey = V4.bytesToKeyObject(pasetoKeyInBytes) // Convert the byte array back to a key object

console.log("RestoredKey🎇", pKey)

//create token
const refreshToken = await V4.sign({ sub: "johndoe" }, pKey)

console.log("✨REFRESH!", refreshToken)
