import { component$, useContext, useTask$, useVisibleTask$ } from "@builder.io/qwik"
import { Link, RequestEvent } from "@builder.io/qwik-city"
import { useAuth } from "../../../hooks/useAuth"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"
import { modalCodes } from "../../../config"
import ImgAknm024Thumb260px from "../../../../public/images/aknm024-thumb-260px.jpg?jsx"
import { routeLoader$ } from "@builder.io/qwik-city"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"
import { IndexOrders } from "../../../components/AccountPages/IndexOrders"
//Fetch this data from the backend
import { obj } from "./postgresData"

// export const useProtectedRoute = routeLoader$(async ({ cookie }) => {
//   const coo = cookie.get("cltoken")
//   const poo = cookie.get("site-session")
//   console.log("coo is : ", coo)
//   console.log("poo is : ", poo)
// })

export const onGet = async ({ cookie, redirect }: RequestEvent) => {
  // redirect to login page if not logged in
  const isAuthrized = cookie.get("site-session")

  if (!isAuthrized?.value) {
    throw redirect(302, "/portal/signin")
  }
}

export default component$(() => {
  const { modalState } = useContext(ContextIdGlobalState)
  const { userState } = useAuth("/user-area-test")
  return (
    <section>
      <Breadcrumbs />
      {!modalState.showModal ? <IndexOrders orderObjArr={obj} /> : <div>Nothing to show here</div>}
    </section>
  )
})
