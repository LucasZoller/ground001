import { component$, Slot } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"

import type { RequestHandler } from "@builder.io/qwik-city"
import type { SuccessfulSignInPayload } from "../types"

import { ContextProviderGlobalState } from "../context/ContextGlobalState"
import { ContextProviderUserState } from "../context/ContextUserState"
import { ContextProviderAuthState } from "../context/ContextAuthState"

import Header from "../components/GlobalHeader/Header"
import SubHeader from "../components/GlobalHeader/SubHeader"
import Footer from "../components/GlobalFooter/Footer"
import ModalPortal from "../components/Modals/ModalPortal"
import AutomaticUserOnboarding from "../components/UtilityComponents/AutomaticUserOnboarding"

import wretch from "wretch"
import { BACK_URL } from "../config"

// export const onGet: RequestHandler = async ({ cacheControl }) => {
//   // Control caching for this request for best performance and to reduce hosting costs:
//   // https://qwik.dev/docs/caching/
//   cacheControl({
//     // Always serve a cached response by default, up to a week stale
//     staleWhileRevalidate: 60 * 60 * 24 * 7,
//     // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
//     maxAge: 5,
//   })
// }

// This logic should only run once at the time of the intial render.
// But onRequest generally fires on every http request.
// "Prefetch" is a http request. So, avoid "prefetch" from firing onRequest.
export const onRequest: RequestHandler = async ({ cookie, sharedMap, request }) => {
  const isPrefetch = request.headers.get("Sec-Fetch-Mode") === "cors"
  if (isPrefetch) return // Immediately break out in case of "prefetch".

  const rt = cookie.get("revive")?.value
  if (!rt) return // Immediately break out if rt is undefined.

  try {
    // This code is supposed to run only on initial render.

    const payload = await wretch(`${BACK_URL}/auth-publish-at-from-rt`)
      .headers({ authorization: `Bearer ${rt}` })
      .get()
      .json<SuccessfulSignInPayload>()

    cookie.set("revive", payload.rt, {
      path: "/",
      maxAge: parseInt(payload.rtExpInSec),
      sameSite: "Lax",
      httpOnly: true,
      secure: true
    })
    cookie.set("torch", payload.at, {
      path: "/",
      maxAge: parseInt(payload.atExpInSec),
      sameSite: "Lax",
      httpOnly: true,
      secure: true
    })

    sharedMap.set("id", payload.id)
    sharedMap.set("userName", payload.userName)
    sharedMap.set("cart", payload.cart)
    sharedMap.set("lang", payload.lang)
  } catch (err: any) {
    console.log(err.message)
  }
}

export const useSharedMapLoader = routeLoader$(async ({ sharedMap, request }) => {
  const isPrefetch = request.headers.get("Sec-Fetch-Mode") === "cors"
  if (isPrefetch) return // Immediately break out in case of "prefetch".

  const id = sharedMap.get("id")
  const userName = sharedMap.get("userName")
  const cart = sharedMap.get("cart")
  const lang = sharedMap.get("lang")

  return { id, userName, cart, lang }
})

export default component$(() => {
  const data = useSharedMapLoader()

  return (
    <>
      <main class="test">
        <ContextProviderGlobalState>
          <ContextProviderUserState>
            <ContextProviderAuthState>
              <AutomaticUserOnboarding props={data.value} />
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
