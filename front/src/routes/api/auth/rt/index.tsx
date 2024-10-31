import { component$ } from "@builder.io/qwik"
import type { RequestHandler } from "@builder.io/qwik-city"

export const onRequest: RequestHandler = async (act) => {
  const { cookie, headers } = act
  console.log("where is my cookies? : ", cookie.get("cltoken"))
}

export default component$(() => {
  return <>Don't access api/auth</>
})
