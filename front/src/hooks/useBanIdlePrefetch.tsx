import { useSignal, useTask$ } from "@builder.io/qwik"
import { useNavigate } from "@builder.io/qwik-city"
import { isBrowser } from "@builder.io/qwik/build"
import { tokenLifeChecker } from "../helpers/cookie-helper"

// This hook checks an extreme edge case,
// where the navigation happens 1 week after the prefetch.
// This hook prevents painting the display based on an expired AT check.

export const useBanIdlePrefetch = () => {
  const nav = useNavigate()
  const allowDisplay = useSignal(false)
  useTask$(async () => {
    if (isBrowser) {
      // Make usre user came here by navigation.
      const { isAtAlive, isRtAlive } = await tokenLifeChecker()
      if (!isAtAlive && isRtAlive) {
        // The navigation to this page has happened way after the prefetch, and
        // AT has expired, but RT is still in the cookie.
        // Force reload, and let the root layout verify RT.

        window.location.reload()
      } else if (!isAtAlive && !isRtAlive) {
        // Both AT and RT are expired and no longer found.
        // redirect to /portal/signin
        nav("/portal/signin")
      } else allowDisplay.value = true
    } else allowDisplay.value = true
  })
  return allowDisplay.value
}
