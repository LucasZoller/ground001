import { component$, Slot } from "@builder.io/qwik"
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city"
import Footer from "../components/GlobalFooter/Footer"
import Header from "../components/GlobalHeader/Header"
import SubHeader from "../components/GlobalHeader/SubHeader"
import ModalPortal from "../components/Modals/ModalPortal"

import { ContextProviderGlobalState } from "../context/ContextGlobalState"
import { ContextProviderUserState } from "../context/ContextUserState"
import { ContextProviderAuthState } from "../context/ContextAuthState"

import wretch from "wretch"
import { BACK_URL } from "~/config"

import AutomaticUserOnboarding from "../components/LogicComponents/AutomaticUserOnboarding"

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5
  })
}

// export const onRequest: RequestHandler = async ({ cookie }) => {
//   const rt = cookie.get("revive")?.value

//   try {
//     const payload = await wretch(`${BACK_URL}/auth-publish-at-from-rt`)
//       .headers({ authorization: `Bearer ${rt}` })
//       .options({ credentials: "include" })
//       .get()
//       .json<SuccessfulSignInPayload>()
//     cookie.set("willThisHappen?", "some-value-abc-012012")
//   } catch (err: any) {
//     console.log(err.message)
//   }
// }

// export const useAutomatic = routeLoader$(async ({ cookie }) => {
//   const rt = cookie.get("revive")
//   try {

//   } catch (err) {
//     console.log(err)
//   }
// })

export default component$(() => {
  return (
    <>
      <main class="test">
        <ContextProviderGlobalState>
          <ContextProviderUserState>
            <ContextProviderAuthState>
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
