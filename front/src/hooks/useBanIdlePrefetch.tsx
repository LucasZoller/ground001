import { useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik"
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
      // Make sure user came here by page navigation. In other words, we filter out initial load.
      try {
        const { isAtAlive, isRtAlive } = await tokenLifeChecker() // Returns booleans based on the existance of both tokens in the cookie.
        if (isAtAlive && isRtAlive) {
          // The user came here by page navigation, and the AT is still in the cookie.
          allowDisplay.value = true
        } else if (!isAtAlive && isRtAlive) {
          // The navigation to this page has happened way after the prefetch, and
          // AT has expired, but RT is still in the cookie.
          // Force reload, and let the root layout verify RT.

          window.location.reload()
        } else if (!isAtAlive && !isRtAlive) {
          // Both AT and RT are missing or expired.
          // redirect to /portal/signin
          nav("/portal/signin")
        } else throw new Error("ERR_AT_PRESENT_BUT_RT_MISSING") // Suspicious case.
      } catch (err: any) {
        nav("/portal/signin")
        console.error("tokenLifeChecker failed. what is the allowDisplay.value ?", allowDisplay.value)
      }
    } else allowDisplay.value = true // Code running in the server. Meaning, this is the initial load.
  })
  return allowDisplay.value
}
