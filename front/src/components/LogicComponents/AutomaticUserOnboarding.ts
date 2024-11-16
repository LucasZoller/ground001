import {
  component$,
  useContext,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../context/ContextGlobalState"
import { getCookieHelper, setCookieHelper } from "../../helpers/cookie-helper"
import {
  updateTempDataHelper,
  updateSessionStateHelper,
} from "../../helpers/update-data-helper"
import type { SuccessfulSignInPayload } from "../../types"
import { BACK_URL } from "../../config"
import wretch from "wretch"

export default component$(() => {
  // CASE.1 : (!rt&&!at) Treat this user as a guest. DO NOTHING.
  // CASE.2 : (rt&&!at) Use RT to fetch state values. Set new AT and RT to the cookie.
  // CASE.3-1 : (rt&&at) Regular navigation => Already has memory states. DO NOTHING.
  // CASE.3-2 : (rt&&at) Reload or Stateless revisit => Use RT to fetch state values. Set new AT and RT to the cookie.

  const { sessionState } = useContext(ContextIdGlobalState)
  // CASE.3-1 : Regular navigation. Do nothing and break out immediately.
  if (sessionState.userName && sessionState.userName.length > 1) return

  const tempStore = useStore({
    userName: "",
    cart: [""],
    lang: "",
    at: "",
    atExpInSec: "", // Timestamp in seconds. For cookie MaxAge.
    rt: "",
    rtExpInSec: "", // Timestamp in seconds. For cookie MaxAge.
  })
  const needVisibleTask = useSignal(false)

  useTask$(async () => {
    const { at, atExp, rt, rtExp } = await getCookieHelper()
    if (!rt && !at) return // CASE.1 : Treat this user as a guest. Do nothing.

    // CASE.2 : (rt&&!at) Use RT to fetch state values. Set new AT and RT to the cookie.
    // CASE.3-2 : (rt&&at) Reload or Stateless revisit => Use RT to fetch state values. Set new AT and RT to the cookie.
    const payload = await wretch(`${BACK_URL}/auth-publish-at-from-rt`)
      .headers({ authorization: `Bearer ${rt}` })
      .get()
      .json<SuccessfulSignInPayload>()

    updateTempDataHelper(tempStore, payload) // Update tempStore.
    needVisibleTask.value = true
  })

  useVisibleTask$(async ({ track }) => {
    track(() => needVisibleTask.value)
    if (needVisibleTask.value) {
      // Update cookies (Only works with useVisibletask$)
      setCookieHelper(
        tempStore.rt,
        tempStore.rtExpInSec,
        tempStore.at,
        tempStore.atExpInSec
      )
      updateSessionStateHelper(sessionState, tempStore) // Update session state.
      needVisibleTask.value = false // Reset the needVisibleTask back to false.
    }
  })

  return null
})
