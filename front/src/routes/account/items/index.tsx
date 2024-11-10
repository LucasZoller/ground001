import { component$, useContext, useTask$, useVisibleTask$ } from "@builder.io/qwik"
import { RequestEvent, routeLoader$ } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"
import { useAuth } from "../../../hooks/useAuth"

import { IndexItems } from "../../../components/AccountPages/IndexItems"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"
import wretch from "wretch"
import { BACK_URL } from "../../../config"

import { setCookieHelper } from "../../../helpers/cookie-helper"

// Replace the following "obj" with the actual fetched data from postgres!!🐘🐘🐘🐘
// use routeLoader$
import { obj } from "./posgresData"

export const onGet = async ({ cookie, redirect }: RequestEvent) => {
  // Immediately redirect if RT is missing.
  const hasRt = cookie.get("revive")
  if (!hasRt) {
    throw redirect(302, "/portal/signin")
  }
}

// export const useSetCookieLoader = routeLoader$(async()=>{
// Declare another routeLoader$ to set cookie.
// Make this routeLoader receive data from the routeLoader below.
//})

export const useLoader = routeLoader$(async ({ cookie }) => {
  console.log("🍩🍩🍩routeLoader from /account/items/index.tsx is running!")
  const at = await cookie.get("torch")?.value
  const rt = await cookie.get("revive")?.value

  try {
    const data = await wretch(`${BACK_URL}/protected-item`)
      .headers({ at: `Bearer ${at}` })
      .headers({ rt: `Bearer ${rt}` })
      .get()
      .json<any>()
    //The shape of data coming from the backend is this:
    // data = {
    //   basics: {
    //     user_code: userCode,
    //     user_name: user.rows[0].user_name,
    //     lang: user.rows[0].lang,
    //     email: user.rows[0].email,
    //     created_at: user.rows[0].created_at,
    //     last_modified_at: user.rows[0].last_modified_at,
    //     at: request.payload.at,
    //     atExp: request.payload.atExp,
    //     atExpInSec: request.payload.atExpInSec,
    //     rt: request.payload.rt,
    //     rtExp: request.payload.rtExp,
    //     rtExpInSec: request.payload.rtExpInSec
    //   },
    //   routeSpecific: { message: "🎊🎊🎊Successfully logged in! Welcome🎊🎊🎊" }
    // }
    console.log("🍍🍍🍍Was the fetch successful?? : ", data)
    //await cookie.set("torch", data.value.basics.at, { path: "/", secure: true, sameSite: "Lax", httpOnly: true })
    //await cookie.set("revive", data.value.basics.rt, { path: "/", secure: true, sameSite: "Lax", httpOnly: true })
    return data
  } catch (err) {
    console.log("The backend returned an error. : ", err)
    //This user is not allowed to enter protected route.
  }
})

export default component$(() => {
  const { sessionState } = useContext(ContextIdGlobalState)

  const data = useLoader()
  // useVisibleTask$(() => {
  //   setCookieHelper(
  //     data.value.basics.rt,
  //     data.value.basics.rtExp,
  //     data.value.basics.rtExpInSec,
  //     data.value.basics.at,
  //     data.value.basics.atExp,
  //     data.value.basics.atExpInSec
  //   )
  // })
  //
  //   console.log("🍩🍩🍩useLoader brought us this : data.value.basics : ", data.value.basics)
  //   console.log("🍩🍩🍩useLoader brought us this : data.value.basics.email : ", data.value.basics.email)
  //
  console.log("🍩🍩🍩/account/items/index.tsx is rendering!")
  console.log("🍩🍩🍩useLoader brought us this : ", data)
  console.log("🍩🍩🍩useLoader brought us this : ", data.value)

  return (
    <section>
      <div>{data.value.basics?.email}</div>
      hoooo
      <Breadcrumbs />
      {/* {userState.user_code ? <IndexItems cardObjArray={obj} /> : <div>nothing to show</div>} */}
    </section>
  )
})
