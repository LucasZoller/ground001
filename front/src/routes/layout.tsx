import {
  component$,
  createContextId,
  Slot,
  useContextProvider,
  useStore,
  useTask$,
} from "@builder.io/qwik"
import {
  routeLoader$,
  server$,
  type RequestHandler,
} from "@builder.io/qwik-city"
import Footer from "../components/GlobalFooter/Footer"
import Header from "../components/GlobalHeader/Header"
import SubHeader from "../components/GlobalHeader/SubHeader"
import ModalPortal from "../components/Modals/ModalPortal"

import { ContextProviderGlobalState } from "../context/ContextGlobalState"
import { ContextProviderUserState } from "../context/ContextUserState"
import { ContextProviderAuthState } from "../context/ContextAuthState"

import wretch from "wretch"
import { BACK_URL } from "../config"
import type { SuccessfulSignInPayload } from "../types"

import UpdateContext from "../components/LogicComponents/UpdateContext"

import AutomaticUserOnboarding from "../components/LogicComponents/AutomaticUserOnboarding"

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  })
}

// export const getRt = server$(function async() {
//   const rt = this.cookie.get("revive")?.value
//   const at = this.cookie.get("torch")?.value
//   return { rt, at }
// })

// export const useInitialLoader = routeLoader$(async () => {
//   console.log("🕯️🕯️🕯️🕯️Loader1 in the root layout is running...")
//   const { rt, at } = await getRt()
//   // const at = cookie.get("torch")?.value
//   // const rt = cookie.get("revive")?.value
//   if (!rt && !at) return
//   else if (rt && !at) {
//     console.log("🕯️🕯️🕯️🕯️Loader1 ENTERED rt && !at")
//     const payload = await wretch(`${BACK_URL}/auth-publish-at-from-rt`)
//       .headers({ authorization: `Bearer ${rt}` })
//       .get()
//       .json<SuccessfulSignInPayload>()
//     return payload
//     // The shape of the payload is this
//     // userName: string
//     // cartItems: string[]
//     // lang: string
//     // at:string
//     // atExp: string
//     // atExpInSec: string
//     // rt: string
//     // rtExp: string
//     // rtExpInSec: string
//   } else if (rt && at) {
//     console.log("🕯️🕯️🕯️🕯️Loader1 ENTERED rt && at")
//     return
//   }
// })

// export const useSecondLoader = routeLoader$(
//   async ({ resolveValue, cookie }) => {
//     console.log("🔮🔮🔮🔮Loader2 in the root layout is running...")
//     const at = cookie.get("torch")?.value
//     const rt = cookie.get("revive")?.value

//     if (!at && !rt) return { payload: null, performMemoryCheck: false }
//     else if (rt && !at) {
//       console.log("🔮🔮🔮🔮Loader2 ENTERED rt && !at")
//       // Possible scenarios :
//       // 1 : User came back to the site after 4 hours or 2 days. (No memory)
//       // 2 : User left the PC and the browser open for 4 hours or 3 days. (Store values in tact)
//       // Despite the above 2 patterns, we don't have to worry about the store values.
//       // Since AT is absent, we have to access DB anyway.
//       // So fetch the store values altogether.
//       console.log("🔮🔮🔮🔮Loader2 BEFORE resolveValue")
//       const payload = await resolveValue(useInitialLoader)
//       console.log(
//         "🔮🔮🔮🔮Loader2 AFTER resolveValue What is the payload",
//         payload
//       )
//       const newRt = payload?.rt
//       const newAt = payload?.at
//       if (newAt && newRt) {
//         cookie.set("torch", payload?.at, {
//           path: "/",
//           secure: true,
//           httpOnly: true,
//           sameSite: "Lax",
//           maxAge: parseInt(payload?.atExpInSec),
//         })
//         cookie.set("revive", payload?.rt, {
//           path: "/",
//           secure: true,
//           httpOnly: true,
//           sameSite: "Lax",
//           maxAge: parseInt(payload?.rtExpInSec),
//         })
//       }

//       return { payload, performMemoryCheck: false }
//     }
//     if (rt && at) {
//       // If RT and AT are both present, do nothing here.
//       // Because this case has 2 patterns :
//       // 1 : Page reload or stateless-revisit from outside (Browser state reset) => Fetch the state.
//       // 2 : Navigation (Browser state in tact) => Keep the state as are.
//       return {
//         payload: {
//           rt,
//           userName: undefined,
//           cartItems: undefined,
//           lang: undefined,
//         },
//         performMemoryCheck: true,
//       }
//     }
//   }
// )

// export const LittleContext = createContextId<{ val1: number }>("little-context")
export default component$(() => {
  return (
    <>
      <main class="test">
        <ContextProviderGlobalState>
          <ContextProviderUserState>
            <ContextProviderAuthState>
              <AutomaticUserOnboarding />
              <div>
                <Header />
                <SubHeader />
              </div>
              <ModalPortal />
              <Slot />

              <Footer />
            </ContextProviderAuthState>
          </ContextProviderUserState>
        </ContextProviderGlobalState>
      </main>
    </>
  )
})
