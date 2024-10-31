import { component$, Slot, useStore } from "@builder.io/qwik"
import { type RequestHandler } from "@builder.io/qwik-city"

export const onGet: RequestHandler = async ({ json, request }) => {
  console.log(request.headers.get("authorization"))
  json(200, { hello: "hey from onGet in the layout!!🍓" })
}
export default component$(() => {
  return (
    <>
      <div>
        <div style={{ backgroundColor: "red" }}>Hi from layout!</div>
        <Slot />
      </div>
    </>
  )
})
