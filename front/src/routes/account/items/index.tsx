import { component$, useTask$ } from "@builder.io/qwik"
import { RequestEvent } from "@builder.io/qwik-city"

import { useAuth } from "../../../hooks/useAuth"

import { IndexItem } from "../../../components/AccountPages/IndexItem"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"

// Replace the following "obj" with the actual fetched data from postgres!!🐘🐘🐘🐘
// use routeLoader$
import { obj } from "./posgresData"

export const onGet = async ({ cookie, redirect }: RequestEvent) => {
  // redirect to login page if not logged in
  const isAuthrized = cookie.get("site-session")

  if (!isAuthrized?.value) {
    throw redirect(302, "/portal/signin")
  }
}

export default component$(() => {
  const { userState, sessionState } = useAuth("/user-area-test")

  return (
    <div>
      <Breadcrumbs />
      {userState.user_code ? <IndexItem cardObjArray={obj} /> : <div>nothing to show</div>}
    </div>
  )
})
