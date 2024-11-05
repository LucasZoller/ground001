import { component$, useTask$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import wretch from "wretch"

// export const useLoader = routeLoader$(async () => {
//   await wretch("http://localhost:43718/api/playground/").get()
// })

// export default component$(() => {
//   useLoader()

//   return <>Heyy!!! this is test!</>
// })
