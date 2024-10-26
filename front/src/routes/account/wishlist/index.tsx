import { component$ } from "@builder.io/qwik"
import { RequestEvent } from "@builder.io/qwik-city"

import { useAuth } from "../../../hooks/useAuth"

import { obj } from "./postgresData"
import { IndexWish } from "../../../components/AccountPages/IndexWish"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"

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
    <section>
      <Breadcrumbs />
      {userState.user_code ? (
        <IndexWish wishItemObjArr={obj} />
      ) : (
        <div>Nothing to show here</div>
      )}
    </section>
  )
})
