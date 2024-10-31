import { component$, useStore, useTask$ } from "@builder.io/qwik"
import type { RequestHandler } from "@builder.io/qwik-city/middleware/request-handler"
import wretch from "wretch"

export const auth = async (at: string | undefined) => {
  await wretch("http://localhost:43718/api/auth/at/")
    .headers(at ? { Authorization: at } : {}) // Only set if `at` has a value
    .get()
}

export default component$(() => {
  const store = useStore({ at: "some AT" })

  useTask$(async () => {
    auth(store.at)

    console.log("🦞")
  })

  return <>hey from api/playground!</>
})
