import { useContext, useTask$, useVisibleTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../context/ContextGlobalState"
import { base64StringToNumberConverter, cookieValueExtractor } from "~/helpers/string-helpers"
import { useSiteSessionLoader } from "../loaders/siteSessionLoader"

export const useVerifySiteSession = () => {
  const { sessionState, signInIconState } = useContext(ContextIdGlobalState)
  const loaderObj = useSiteSessionLoader()
  const sessionObj = loaderObj.value
  //eslint-disable-next-line qwik/no-use-visible-task
  // useVisibleTask$(
  //   async ({ track }) => {
  //     track(() => sessionState.atExp)
  //     // The Following code runs anytime when globalState.at changes.

  //     try {
  //       // 1: Get site-session cookie value.
  //       const siteSessionValue = await cookieValueExtractor("site-session=")

  //       // 2: Decode the site-session from base64 to number.
  //       const siteSessionTimeStamp = await base64StringToNumberConverter(siteSessionValue)

  //       // 3: Verify the site-session Time Stamp.
  //       loginIconState.greeting = siteSessionTimeStamp > Date.now() ? "Hello!💓🎀💓" : "Login"
  //       siteSessionTimeStamp > Date.now() ? (sessionState.isValidRtFound = true) : (sessionState.isValidRtFound = false)
  //     } catch (err: any) {
  //       console.log("🎈🎈🎈Error from HeaderLoginIcon : ", err.message)
  //       loginIconState.greeting = "Login"
  //     }
  //   },
  //   { strategy: "document-ready" }
  // )
  // eslint-disable-next-line qwik/no-use-visible-task
  useTask$(async ({ track }) => {
    track(() => sessionState.atExp)
    // The Following code runs anytime when globalState.at changes.
    if (sessionObj !== undefined) {
      try {
        // 1: Decode the site-session from base64 to number.
        const siteSessionTimeStamp = await base64StringToNumberConverter(sessionObj.siteSession)

        // 2: Verify the site-session Time Stamp.
        signInIconState.greeting = siteSessionTimeStamp > Date.now() ? "Hello!💓🎀🎀💓" : "Sign in"

        siteSessionTimeStamp > Date.now() ? (sessionState.isValidRtFound = true) : (sessionState.isValidRtFound = false)
        console.log("sessionState.isValidRtFound : ", sessionState.isValidRtFound)
      } catch (err: any) {
        console.log("🎈🎈🎈Error from useVerifySiteSession : ", err.message)
        signInIconState.greeting = "Sign in"
      }
    }
  })
}
