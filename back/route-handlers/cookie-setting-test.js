import { config } from "../config.js"

export const cookieSettingTest = async (request, reply) => {
  // Form is not blank.
  console.log("cookieSettingTest is triggered!!!🎭🎭🎭")
  let client
  try {
    reply
      .setCookie("neuNeu", "rawRt", {
        path: "/", // Makes the cookie accessible from all paths in the backend
        httpOnly: false
      })
      .setCookie("pooooonnnn", "rtExpInBase64Code", {
        path: "/",
        httpOnly: false, // Accessible to JavaScript
        secure: false, // Send only over HTTPS (set to false for local dev)
        sameSite: "Strict"
      })

      // 7. Send response
      .code(200)
      .send({ code: "LOGGED_IN" })
  } finally {
    if (client) client.release()
  }
}
