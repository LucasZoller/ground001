import { component$, useContext, useStore, useTask$, useVisibleTask$ } from "@builder.io/qwik"
import { RequestEvent, routeLoader$, useNavigate } from "@builder.io/qwik-city"
import { useAuth } from "../../../hooks/useAuth"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"

import { AccountPagesSignIn } from "~/components/AccountPages/LoggedOut/AccountPagesSignIn"

import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"
import { IndexOrders } from "../../../components/AccountPages/IndexOrders"
//Fetch this data from the backend
import { obj } from "./postgresData"

export const useProtectedContentsLoader = routeLoader$(async ({ cookie }) => {})

const LoggedIn = component$(() => {
  return <>Hey I am logged in!</>
})
const LoggedOut = component$(() => {
  return <>loading.....💎</>
})

export default component$(() => {
  const { sessionState } = useContext(ContextIdGlobalState)
  useAuth("/user-area-test")
  const nav = useNavigate()
  const flag = useStore({
    render: false
  })
  useVisibleTask$(({ track }) => {
    track(() => sessionState.navigateToSignIn)
    if (sessionState.navigateToSignIn) {
      nav("/portal/signin")
      //sessionState.navigateToSignIn = false
    } else {
      flag.render = true
    }
  })

  return <>{sessionState.navigateToSignIn ? <LoggedOut /> : <LoggedIn />}</>
})
