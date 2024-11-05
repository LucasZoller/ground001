import { RequestHandler } from "@builder.io/qwik-city"

import wretch from "wretch"
import { BACK_URL } from "../config"

// export const onRequest: RequestHandler = async ({ cookie, sharedMap }) => {
//   //   const { sessionState } = useContext(ContextIdGlobalState)
//   //   console.log("Is this shows up, we can use useContext in plugin.", sessionState.basicUserCheckDone)
//   console.log("🎨🎡🎡🎡🎡🎡🎡🎡can we even get cookie?", cookie.getAll())
//   console.log("what the hell is plugin.ts???🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨🎨")

//   try {
//     const data = await wretch(`${BACK_URL}/auth-basic-user-check`)
//       .options({ credentials: "include" })
//       .post({ rt: cookie.get("cltoken")?.value })
//       .json()

//     console.log("If we have rawRt, that's a good sign :", data.rawRt)
//     console.log("If we have rawRt, that's a good sign :", data)
//     cookie.set("cltoken", data.rawRt, { httpOnly: true, path: "/" })
//     await sharedMap.set("all", data)
//   } catch (err) {}
// }
