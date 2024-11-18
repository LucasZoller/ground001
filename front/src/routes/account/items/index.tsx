import { component$, useContext, useTask$, useVisibleTask$ } from "@builder.io/qwik"
import { RequestEvent, routeLoader$, server$ } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"

import { IndexItems } from "../../../components/AccountPages/IndexItems"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"
import wretch from "wretch"
import { BACK_URL } from "../../../config"

// Replace the following "obj" with the actual fetched data from postgres!!🐘🐘🐘🐘
// use routeLoader$
import { obj } from "./posgresData"

// CASE.1 : (!rt) => Immediately redirect. (No need to see AT. Supposed to be !at if !rt.)
// CASE.2-1 : (rt&&at) => Use AT. Page-reload or revisit (stateful/stateful), scenario doesn't matter.
// CASE.2-2 : (rt&&!at) => Use RT. Page-reload or revisit (stateful/stateful), scenario doesn't matter.

// Order of execution
// In CASE.2-2, AutomaticUserOnboarding fires first, but setting new RT/AT happens inside VisibleTask. This will mean :
// onGet, server$, Loader can all get the RT, but it is going to be the old RT, before AutomaticUserOnboarding updates it.
// But this old RT still works and fetches the user data no problem.
// AutomaticUserOnboarding update the RT/AT in the DB and cookie after the fact.
// So, no need to refresh DB/cookie here. Let AutomaticUserOnboarding handle the job.

export const onGet = async ({ cookie, redirect }: RequestEvent) => {
  // CASE.1 : RT is missing => Immediately redirect.
  const rt = await cookie.get("revive")?.value
  if (!rt) throw redirect(302, "/portal/signin")
}

export const useProtectedDataLoader = routeLoader$(async ({ cookie }) => {
  //const serverData = await resolveValue(useRawDataLoader)
  const rt = cookie.get("revive")?.value
  const at = cookie.get("torch")?.value
  try {
    // Use AT or RT to fetch data. We don't care about the state. Just get everythign we need.
    // `/protected-item` path is universally used for both (rt&&at) and (rt&&!at) cases.
    // `authUser` plugin in the backend will automatically decide to use AT or RT.
    // Use header to send AT/RT, since we don't update cookies. AutomaticUserOnboarding will do this job

    const data = await wretch(`${BACK_URL}/protected-item`)
      .headers({ at: `Bearer ${at}` })
      .headers({ rt: `Bearer ${rt}` })
      .get()
      .json<any>()

    return data
  } catch (err) {
    console.log(err)
  }
})

export default component$(() => {
  const { sessionState } = useContext(ContextIdGlobalState)
  // The initial update of sessionState is done by the AutomaticUserOnboarding component.
  // Updating sessionState here with the loader data will result in conflict and the cookie setting won't work as expected.

  const data = useProtectedDataLoader()

  return (
    <section>
      <div class="p5">
        <div>
          userCode : <span class="color-magenta">{data.value.userCode}</span>
        </div>
        <div>
          userName : <span class="color-magenta">{sessionState.userName}</span>
        </div>
        <div>
          Language : <span class="color-magenta">{sessionState.lang}</span>
        </div>
        <div>
          Cart : <span class="color-magenta">{sessionState.cart && sessionState.cart.length > 0 ? sessionState.cart : "No item!"}</span>
        </div>
        <div>
          Route specific data : <span class="color-magenta">{data.value.routeSpecific.message}</span>
        </div>
      </div>

      <Breadcrumbs />
      {data.value.verified ? <IndexItems cardObjArray={obj} /> : <div>Not verified. Nothing to show</div>}
    </section>
  )
})
