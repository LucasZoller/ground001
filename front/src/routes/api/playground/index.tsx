import { component$, useStore, useTask$ } from "@builder.io/qwik"
import type { RequestHandler } from "@builder.io/qwik-city/middleware/request-handler"
import wretch from "wretch"
import { BACK_URL } from "../../../config"
import { routeLoader$ } from "@builder.io/qwik-city"

// const cookieLoader = routeLoader$(async({cookie})=>{
// await wretch("/route/path/")orpintn({confidential:"true"}).get(

// //comment out)

// })
// export const onRequest: RequestHandler = async ({ cookie, sharedMap }) => {
//   //   const { sessionState } = useContext(ContextIdGlobalState)
//   //   console.log("Is this shows up, we can use useContext in plugin.", sessionState.basicUserCheckDone)
//   console.log("🎡🎡🎡🎡🎡🎡🎡🎡🎡🎡🎡🎡🎡🎡can we even get cookie?", cookie.getAll())
//   console.log("what the hell is plugin.ts???🎋🎋🎋🎋🎋🎋🎋🎋🎋🎋🎋🎋🎋🎋🎋🎋🎋🎋🎋🎋🎋🎋")
// }
// export default component$(() => {
//   return <></>
// })
