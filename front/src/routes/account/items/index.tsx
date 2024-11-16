import { component$, useContext } from "@builder.io/qwik"
import { RequestEvent, routeLoader$ } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"

import { IndexItems } from "../../../components/AccountPages/IndexItems"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"
import wretch from "wretch"
import { BACK_URL } from "../../../config"

import { setCookieHelper } from "../../../helpers/cookie-helper"

// Replace the following "obj" with the actual fetched data from postgres!!🐘🐘🐘🐘
// use routeLoader$
import { obj } from "./posgresData"

// CASE.1 : RT is missing => Immediately redirect.
// CASE.2 : AT is missing => AT should've benn published by the AutomaticUseronboarding if RT existed.
// CASE.3 : AT is present but invalid => THIS USER IS SUSPICIOUS. Immediately redirect.
// CASE.4 : AT is present and valid => Sign in.

// What will happen if a user comes here directly?
// Should we wait untill AutomaticUseronboarding finishes? What should we use as a flag?
// Do we have to set cookies?

export const onGet = async ({ cookie, redirect }: RequestEvent) => {
  // CASE.1 : RT is missing => Immediately redirect.
  const hasRt = cookie.get("revive")
  if (!hasRt) {
    throw redirect(302, "/portal/signin")
  }
}

export const useFilteredDataLoader = routeLoader$(
  async ({ resolveValue, cookie }) => {
    const serverData = await resolveValue(useRawDataLoader)
    console.log("🦄🦄🦄resolveValue data is this : ", serverData)

    //We tried to set cookie here. But AutomaticUserOnboarding is doing the job too.

    // if (serverData.basics?.at && serverData.basics?.rt) {
    //   // We only update RT/AT when RT was used for user verification.
    //   // If AT is still valid, no need to update RT and AT in the browser cookie.
    //   await cookie.set("torch", serverData.basics.at, {
    //     path: "/",
    //     secure: true,
    //     sameSite: "Lax",
    //     httpOnly: true,
    //     //Let's set maxAge too.
    //   })
    //   await cookie.set("revive", serverData.basics.rt, {
    //     path: "/",
    //     secure: true,
    //     sameSite: "Lax",
    //     httpOnly: true,
    //     //Let's set maxAge too.
    //   })
    // }
    // const filteredData = {
    //   basics: {
    //     user_code: serverData.basics.userCode,
    //     user_name: serverData.basics.user_name,
    //     lang: serverData.basics.lang,
    //     email: serverData.basics.email,
    //     created_at: serverData.basics.created_at,
    //     last_modified_at: serverData.basics.last_modified_at,
    //   },
    //   routeSpecific: serverData.routeSpecific,
    // }
    // return filteredData
  }
)

export const useRawDataLoader = routeLoader$(async ({ cookie }) => {
  console.log("🍩🍩🍩routeLoader from /account/items/index.tsx is running!")
  const at = await cookie.get("torch")?.value
  const rt = await cookie.get("revive")?.value

  try {
    const serverData = await wretch(`${BACK_URL}/protected-item`)
      .headers({ at: `Bearer ${at}` })
      .headers({ rt: `Bearer ${rt}` })
      .get()
      .json<any>()

    console.log("🍍🍍🍍Was the fetch successful?? : ", serverData)
    return serverData
    //The shape of data coming from the backend is this:
    //Scenario A : When AT was used to user varification
    // data = {
    //   basics: {
    //     user_code: userCode,
    //     user_name: user_name,
    //     lang: lang,
    //     email: email,
    //     created_at: created_at,
    //     last_modified_at: last_modified_at,
    //   },
    //   routeSpecific: { message: "🎊🎊🎊Successfully logged in! Welcome🎊🎊🎊" }
    // }

    //Scenario B : When RT was used to user varification (We get *** in addition.)

    // data = {
    //   basics: {
    //     user_code: userCode,
    //     user_name: user_name,
    //     lang: lang,
    //     email: email,
    //     created_at: created_at,
    //     last_modified_at: last_modified_at,
    //     ***at: at,
    //     ***atExp: atExp,
    //     ***atExpInSec: atExpInSec,
    //     ***rt: rt,
    //     ***rtExp: rtExp,
    //     ***rtExpInSec: rtExpInSec
    //   },
    //   routeSpecific: { message: "🎊🎊🎊Successfully logged in! Welcome🎊🎊🎊" }
    // }
  } catch (err) {
    console.log("The backend returned an error. : ", err)
    //This user is not allowed to enter protected route.
  }
})

export default component$(() => {
  const { sessionState } = useContext(ContextIdGlobalState)
  useFilteredDataLoader()

  return (
    <section>
      {/* <div>{data.value.basics?.email}</div> */}
      hoooo
      <Breadcrumbs />
      {/* {userState.user_code ? <IndexItems cardObjArray={obj} /> : <div>nothing to show</div>} */}
    </section>
  )
})
