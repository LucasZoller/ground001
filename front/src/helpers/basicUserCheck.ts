import { useContext, useTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../context/ContextGlobalState"
import { base64StringToNumberConverter } from "../helpers/string-helpers"

export const useBasicUserCheck = (siteSession: string) => {
  console.log("just checking if my useBasicUserCheck is working!", siteSession)
  // const { sessionState, signInIconState } = useContext(ContextIdGlobalState)

  //   useTask$(async ({ track }) => {
  //     track(() => sessionState.atExp)
  //     // The Following code runs anytime when globalState.at changes.
  //     if (siteSession !== undefined) {
  //       try {
  //         // 1: Decode the site-session from base64 to number.
  //         const siteSessionTimeStamp =
  //           await base64StringToNumberConverter(siteSession)

  //         // 2: Verify the site-session Time Stamp.
  //         signInIconState.greeting =
  //           siteSessionTimeStamp > Date.now() ? "Hey!💓🎀🎀💓" : "Sign in"

  //         siteSessionTimeStamp > Date.now()
  //           ? (sessionState.isValidRtFound = true)
  //           : (sessionState.isValidRtFound = false)
  //         console.log(
  //           "sessionState.isValidRtFound : ",
  //           sessionState.isValidRtFound
  //         )
  //       } catch (err: any) {
  //         console.log("🎈🎈🎈Error from useVerifySiteSession : ", err.message)
  //         signInIconState.greeting = "Sign in"
  //       }
  //     }
  //   })
}
