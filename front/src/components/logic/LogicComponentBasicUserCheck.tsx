import { component$, useContext, useTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../context/ContextGlobalState"
import { base64StringToNumberConverter } from "../../helpers/string-helpers"

type CookieObj = {
  siteSession: string | null
  rt: string | null
}

export default component$(({ cookieObj }: { cookieObj: CookieObj }) => {
  const { sessionState, signInIconState } = useContext(ContextIdGlobalState)
  const { siteSession, rt } = cookieObj

  useTask$(() => {
    console.log("LogicComponentBasic siteSession : ", siteSession)
    if (!siteSession || !rt) {
      sessionState.basicUserCheckDone = true
      return
    }
    try {
      // 1: Decode the site-session from base64 to number.
      const siteSessionTimeStamp = base64StringToNumberConverter(siteSession)

      // 2: Verify the site-session Time Stamp.
      signInIconState.greeting =
        siteSessionTimeStamp > Date.now() ? "Heyy!💓🎀🎀💓" : "Sign in"

      siteSessionTimeStamp > Date.now()
        ? (sessionState.isValidRtFound = true)
        : (sessionState.isValidRtFound = false)
      console.log("sessionState.isValidRtFound : ", sessionState.isValidRtFound)

      // 3: Carry on to actually fetch a) user name and b) cart items

      // 4: Basic user check is done.
      sessionState.basicUserCheckDone = true
      console.log(
        "Is basic user check being performned?? : ",
        sessionState.basicUserCheckDone
      )
    } catch (err: any) {
      console.log("🎈🎈🎈Error from useVerifySiteSession : ", err.message)
      signInIconState.greeting = "Sign in"
    }
  })

  return <></>
})
