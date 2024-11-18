import { component$, useContext, useStore, useTask$, useVisibleTask$ } from "@builder.io/qwik"
import { globalAction$, routeAction$, routeLoader$, server$ } from "@builder.io/qwik-city"
import wretch from "wretch"
import { ContextIdGlobalState } from "~/context/ContextGlobalState"
import { BACK_URL } from "~/config"
// export const useLoader = routeLoader$(async () => {
//   await wretch("http://localhost:43718/api/playground/").get()
// })
import type { SuccessfulSignInPayload } from "~/types"

// export const useSetCookieLoder = routeLoader$(async ({ cookie, sharedMap }) => {
//   console.log("🧭🧭🧭🧭routeLoader from /test is running...")
//   console.log("🧭🧭🧭🧭routeLoader from /test tried to get sharedMap val1 : ", sharedMap.get("val1"))
// })

// export default component$(() => {
//   useLoader()

//   return <>Heyy!!! this is test!</>
// })

// export const setCookie = server$(function async(val1: string, val2: string) {
//   this.cookie.set(val1, val2)
// })

export default component$(() => {
  //useSetCookieLoder()
  // const { sessionState } = useContext(ContextIdGlobalState)
  // const store = useStore({
  //   valA: "",
  //   valB: "",
  //   valC: ""
  // })

  // useTask$(async ({ track }) => {
  //   sessionState.lang = "🦞🦞🦞"
  //   const payload = await wretch(`${BACK_URL}/aaa`).headers({ authorization: `Bearer test` }).get().json()
  //   console.log("This is what /aaa has returned : ", payload)
  //   sessionState.lang = payload.val2
  // })

  return (
    <>
      <div>
        {/* <input type="text" onInput$={e => (sessionState.userName = (e.target as HTMLInputElement).value)} />
        <div>{sessionState.lang}</div>
        <div>{sessionState.userName}</div>
        <div style={{ backgroundColor: "red" }}>{store.valB}</div>
        <div style={{ backgroundColor: "blue" }}> {store.valC}</div> */}
      </div>
    </>
  )
})
