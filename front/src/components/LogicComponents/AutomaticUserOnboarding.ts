import { component$, useContext, useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../context/ContextGlobalState"
import { getCookieHelper } from "../../helpers/cookie-helper"
import { updateSessionStateHelper } from "../../helpers/update-data-helper"
import type { SuccessfulSignInPayload } from "../../types"
import { BACK_URL } from "../../config"
import wretch from "wretch"

export default component$(() => {
  // ***This component runs once on initial render only.***

  // CASE.1 : (!rt&&!at) DO NOTHING. Treat this user as a guest.
  // CASE.2 : (rt&&!at) Use RT to fetch state values. Set new AT and RT to the cookie.
  // CASE.3-1 : (rt&&at) Regular navigation => DO NOTHING. Already has memory states. => This case never exists.
  // CASE.3-2 : (rt&&at) Reload or Stateless revisit => Use RT to fetch state values. Set new AT and RT to the cookie.

  // We should remake this thing.
  // onRequest (middleware) or plugin in the root layout. rt or !rt case.
  // For rt case, fetch sessionState data from the DB and set them to shared map.
  // Then take the shared map values via routeLoader and set them as store.
  // This operation can be done inside a functional component (like this one), or in the root layout.

  const { sessionState } = useContext(ContextIdGlobalState)
  // CASE.3-1 : Regular navigation. Do nothing and break out immediately.
  if (sessionState.userName && sessionState.userName.length > 1) return

  const needVisibleTask = useSignal(false)
  const clientRt = useSignal("")
  const visible = useSignal(0)
  useTask$(async () => {
    const { rt } = await getCookieHelper()

    if (!rt) return // CASE.1 : Omit AT check altogether because (!rt&&at) is too suspicious anyway. If !rt then also !at. )

    clientRt.value = rt
    //await new Promise(resolve => setTimeout(resolve, Math.random() * 10000)) // Network stress simulation
    needVisibleTask.value = true // Triggers the useVisibleTask$
  })

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    // Each lifecycle hook (useTask$, useVisibleTask$) runs in isolation.
    // In other words, visibleTask will also run for ***CASE.1 and 3-1***
    if (needVisibleTask.value) {
      // Break out immediately if CASE.1 and 3-1.
      // Only CASE.2 && 3-2 runs the following lines.
      // const payload = await wretch(`${BACK_URL}/auth-publish-at-from-rt`)
      //   .headers({ authorization: `Bearer ${clientRt.value}` })
      //   .options({ credentials: "include" })
      //   .get()
      //   .json<SuccessfulSignInPayload>()

      updateSessionStateHelper(sessionState, payload) // Update session state.

      needVisibleTask.value = false // Reset the needVisibleTask back to false.
    }
  })

  return null
})
