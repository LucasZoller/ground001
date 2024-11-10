import { component$, useContext, useStore, useTask$, useVisibleTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../context/ContextGlobalState"
import { getCookieHelper, setCookieHelper, sendCookieHelper } from "../helpers/cookie-helper"
import { base64StringToNumberConverter } from "../helpers/string-helpers"
import { authUserSendAccessToken } from "../helpers/auth-user-send-access-token"
import { updateTempDataHelper, updateSessionStateHelper } from "../helpers/update-data-helper"
import type { SuccessfulSignInPayload } from "../types"
import { BACK_URL } from "../config"
import wretch from "wretch"
import { useNavigate } from "@builder.io/qwik-city"

export const useAuth = (backendPath: string) => {
  const { sessionState } = useContext(ContextIdGlobalState)
  const nav = useNavigate()
  const tempStore = useStore({
    userName: "",
    cart: [""],
    lang: "",
    needVisibleTask: false,
    verifyAtAgain: false,
    authTicket: false,
    navigateToSignIn: false,
    at: "",
    atExp: "", // Timestamp in milliseconds. For calculation.
    atExpInSec: "", // Timestamp in seconds. For cookie MaxAge.
    rt: "",
    rtExp: "", // Timestamp in milliseconds. For calculation.
    rtExpInSec: "" // Timestamp in seconds. For cookie MaxAge.
  })

  if (sessionState.userName && sessionState.userName.length > 1) return null
  // 0: Do nothing and break out immediately if sessionState is in memory.

  useTask$(async ({ track }) => {
    track(() => tempStore.verifyAtAgain)
    const { at, atExp, rt, rtExp } = await getCookieHelper()

    try {
      // 1: Missing RT means AT also missing. This user needs login.
      if (!rt || !rtExp)
        throw Error("NEED_SIGN_IN : rt or rtExp is missing in the browser.") // Navigate to login.
      else if (at && atExp) {
        //2: User has AT. Try AT.
        try {
          const payload = authUserSendAccessToken(at, "/user-area-test-with-at") // throw error if unsuccessful.
        } catch (err) {
          //Highly suspicious user. Why have AT what does not work?
          //Network issue?
          //Decide what ot do with this user. Navigate to login? Or use RT?
          //Should we count how many times this happened to this user?
        }
        tempStore.authTicket = true // User can enter protected routes.
        //Should we also update userName, cart, lang??
        //Because working AT means, it was refreshed with RT recently.
        //sessionState is updated then.
      } else if (!at || !atExp) {
        // User has RT but AT missing. Send RT.
        if (base64StringToNumberConverter(rtExp) <= Date.now()) throw Error("NEED_SIGN_IN : RT is expired.") // Navigate to login.

        // 3: Send RT to the backend.
        const payload = await wretch(`${BACK_URL}/user-area-test-with-rt`)
          .headers({ authorization: `Bearer ${rt}` })
          .get()
          .json<SuccessfulSignInPayload>()

        // 4: Update temporary store values.
        updateTempDataHelper(tempStore, payload)
      }
      // 2: Decode base64 to number, and compare with the current time.

      // 5: Trigger useVisibleTask to update cookie and sessionState.
      tempStore.needVisibleTask = true
    } catch (err: any) {
      //Navigate to login
      tempStore.navigateToSignIn = true
      console.log("something went wrong in the try block🧨🧨🧨", err)
    }
  })

  useVisibleTask$(async ({ track }) => {
    track(() => tempStore.authTicket)
    sessionState.authTicket = tempStore.authTicket
  })

  useVisibleTask$(async ({ track }) => {
    track(() => tempStore.navigateToSignIn)
    if (tempStore.navigateToSignIn) nav("/portal/signin/")
  })

  //   useVisibleTask$(async ({ track }) => {
  //     track(() => tempStore.needVisibleTask)
  //     if (tempStore.needVisibleTask) {
  //       // 6: Update cookies (Only works with useVisibletask$)
  //       setCookieHelper(tempStore.rt, tempStore.rtExp, tempStore.rtExpInSec, tempStore.at, tempStore.atExp, tempStore.atExpInSec)

  //       // 7: Update session state.
  //       updateSessionStateHelper(sessionState, tempStore)

  //       // 8: Reset the needVisibleTask back to false.
  //       tempStore.needVisibleTask = false
  //     }
  //   })

  // const { sessionState, modalState } = useContext(ContextIdGlobalState)
  // const userState = useContext(ContextIdUserState)
  // const nav = useNavigate()
  // //Only check the validity of AT.
  // //Let AutomaticUserLogin use RT to get new AT.
  // //AutomaticUserLogin sets AT as sessionState in the useVisibleTask$.

  // useTask$(async ({ track }) => {
  //   track(() => sessionState.at)
  //   // Trigger AutomaticUserLogin if at and atExp is not found in the memory.

  //   if (sessionState.at && sessionState.atExp) {
  //     // 1: at and atExp are both in memory
  //     if (Number(sessionState.atExp) > Date.now()) {
  //       const data = await authUserSendAccessToken(sessionState) // 1-1: At is valid
  //       await authUpdateUserData(userState, data)
  //       sessionState.navigateToSignIn = false
  //     } else {
  //       sessionState.needAutomaticUserSignIn++ // 2-1: AT exists, but is expired or invalid
  //       sessionState.at = "" // If AT is old, automaticUserSignIn hasn't updated the at yet.
  //     }
  //   } else {
  //     sessionState.needAutomaticUserSignIn++ // 2-2: AT is absent.
  //   }
  // })

  return sessionState
}
