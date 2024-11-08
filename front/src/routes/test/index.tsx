import {
  component$,
  useContext,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik"
import {
  globalAction$,
  routeAction$,
  routeLoader$,
} from "@builder.io/qwik-city"
import wretch from "wretch"
import { ContextIdGlobalState } from "~/context/ContextGlobalState"

// export const useLoader = routeLoader$(async () => {
//   await wretch("http://localhost:43718/api/playground/").get()
// })

// export default component$(() => {
//   useLoader()

//   return <>Heyy!!! this is test!</>
// })

export default component$(() => {
  const { sessionState } = useContext(ContextIdGlobalState)
  const store = useStore({
    valA: "",
    valB: "",
    valC: "",
  })

  useTask$(({ track }) => {
    console.log("🍄🍄🍄🍄useTask$ is running!")
    store.valB = `${store.valA} valueB`
    track(() => store.valA)
    store.valC = `${store.valA} valueC`
  })
  useVisibleTask$(({ track }) => {
    track(() => sessionState.userName)
    console.log("👀👀👀👀")
    store.valA = sessionState.userName
  })
  return (
    <>
      <div>
        <input
          type="text"
          onInput$={(e) =>
            (sessionState.userName = (e.target as HTMLInputElement).value)
          }
        />
        <div style={{ backgroundColor: "red" }}>{store.valB}</div>
        <div style={{ backgroundColor: "blue" }}> {store.valC}</div>
      </div>
    </>
  )
})
