import { component$, useContext, useStore, useTask$, useVisibleTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../context/ContextGlobalState"
import { getCookieHelper, setCookieHelper, sendCookieHelper } from "../../helpers/cookie-helper"
import { base64StringToNumberConverter } from "../../helpers/string-helpers"
import { updateTempDataHelper, updateSessionStateHelper } from "../../helpers/update-data-helper"
import type { SuccessfulSignInPayload } from "../../types"
import { BACK_URL } from "../../config"
import wretch from "wretch"

export default component$(() => {
  const { sessionState } = useContext(ContextIdGlobalState)
  const tempStore = useStore({
    userName: "",
    cart: [""],
    lang: "",
    needVisibleTask: false,
    at: "",
    atExp: "", // Timestamp in milliseconds. For calculation.
    atExpInSec: "", // Timestamp in seconds. For cookie MaxAge.
    rt: "",
    rtExp: "", // Timestamp in milliseconds. For calculation.
    rtExpInSec: "" // Timestamp in seconds. For cookie MaxAge.
  })

  if (sessionState.userName && sessionState.userName.length > 1) return null
  // 0: Do nothing and break out immediately if sessionState is in memory.

  useTask$(async () => {
    const { rt, rtExp } = await getCookieHelper()
    console.log("🧵🧵🧵Are we getting the cookie from the browser???", rt, rtExp)
    try {
      // 1: Stop here if RT or site-session is missing in the browser.
      if (!rt || !rtExp) throw Error("Step1 : rt or rtExp is missing in the browser.")

      // 2: Decode base64 to number, and compare with the current time.
      if (base64StringToNumberConverter(rtExp) <= Date.now()) throw Error("Step2 : RT is expired.")

      // 3: Send RT to the backend.
      const payload = await wretch(`${BACK_URL}/auth-publish-at-from-rt`)
        .headers({ authorization: `Bearer ${rt}` })
        .get()
        .json<SuccessfulSignInPayload>()

      // 4: Update temporary store values.
      updateTempDataHelper(tempStore, payload)

      // 5: Trigger useVisibleTask to update cookie and sessionState.
      tempStore.needVisibleTask = true
    } catch (err: any) {
      console.log("something went wrong in the try block🧨🧨🧨", err)
    }
  })

  useVisibleTask$(async ({ track }) => {
    track(() => tempStore.needVisibleTask)
    if (tempStore.needVisibleTask) {
      // 6: Update cookies (Only works with useVisibletask$)
      setCookieHelper(tempStore.rt, tempStore.rtExp, tempStore.rtExpInSec, tempStore.at, tempStore.atExp, tempStore.atExpInSec)

      // 7: Update session state.
      updateSessionStateHelper(sessionState, tempStore)

      // 8: Reset the needVisibleTask back to false.
      tempStore.needVisibleTask = false
    }
  })

  return null
})
