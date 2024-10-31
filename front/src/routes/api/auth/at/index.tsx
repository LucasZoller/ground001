import { component$ } from "@builder.io/qwik"
import type { RequestHandler } from "@builder.io/qwik-city"
import wretch from "wretch"

export const onRequest: RequestHandler = async ({ request, json }) => {
  const at = await request.headers.get("Authorization")
  console.log(at) //undefined
  console.log(typeof at) //undefined

  if (!at) console.log("No AT was found in the request header.")

  if (at) {
    console.log("🐝🐝🐝/api/auth AT found in the request header : ", at)
    //send the AT to the backend to be verified.

    // if AT is valid, isLogin = true
    // if AT is invalid, send RT
    wretch("http://localhost:43718/api/auth/rt")
      .options({ credentials: "include" })
      .post()
  }
}

export default component$(() => {
  return <>Don't access api/auth</>
})
