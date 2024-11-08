import { component$, useTask$ } from "@builder.io/qwik"
import { RequestEvent } from "@builder.io/qwik-city"

import { useAuth } from "../../../hooks/useAuth"

import { IndexItems } from "../../../components/AccountPages/IndexItems"
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
  const { userState, sessionState } = useAuth()

  return (
    <section>
      <Breadcrumbs />
      {userState.user_code ? (
        <IndexItems cardObjArray={obj} />
      ) : (
        <div>nothing to show</div>
      )}
    </section>
  )
})
