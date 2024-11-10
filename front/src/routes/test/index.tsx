import { component$, useContext, useStore, useTask$, useVisibleTask$ } from "@builder.io/qwik"
import { globalAction$, routeAction$, routeLoader$, server$ } from "@builder.io/qwik-city"
import wretch from "wretch"
import { ContextIdGlobalState } from "~/context/ContextGlobalState"

// export const useLoader = routeLoader$(async () => {
//   await wretch("http://localhost:43718/api/playground/").get()
// })

export const useSetCookieLoder = routeLoader$(async ({ cookie }) => {
  cookie.set("testing!", "Are we setting cookies?????")
  //This works!!
})

// export default component$(() => {
//   useLoader()

//   return <>Heyy!!! this is test!</>
// })

export const setCookie = server$(function async(val1: string, val2: string) {
  this.cookie.set(val1, val2)
})

export default component$(() => {
  useSetCookieLoder()
  const { sessionState } = useContext(ContextIdGlobalState)
  const store = useStore({
    valA: "",
    valB: "",
    valC: ""
  })

  // useTask$(({ track }) => {
  //   console.log("🍄🍄🍄🍄useTask$ is running!")
  //   store.valB = `${store.valA} valueB`
  //   track(() => store.valA)
  //   store.valC = `${store.valA} valueC`
  // })
  // useVisibleTask$(({ track }) => {
  //   setCookie("We-need-clever-way-to-set-cookie", "Is this working??")
  //   track(() => sessionState.userName)
  //   console.log("👀👀👀👀")
  //   store.valA = sessionState.userName
  // })
  return (
    <>
      <div>
        <input type="text" onInput$={e => (sessionState.userName = (e.target as HTMLInputElement).value)} />
        <div style={{ backgroundColor: "red" }}>{store.valB}</div>
        <div style={{ backgroundColor: "blue" }}> {store.valC}</div>
      </div>
    </>
  )
})
