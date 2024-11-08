import {
  component$,
  useContext,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik"
import { RequestEvent, useNavigate } from "@builder.io/qwik-city"
import { useAuth } from "../../../hooks/useAuth"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"

import { AccountPagesSignIn } from "~/components/AccountPages/LoggedOut/AccountPagesSignIn"

import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"
import { IndexOrders } from "../../../components/AccountPages/IndexOrders"
//Fetch this data from the backend
import { obj } from "./postgresData"

// export const onGet = async ({ cookie, redirect }: RequestEvent) => {
//   // redirect to login page if not logged in
//   const isAuthrized = cookie.get("site-session")

//   if (!isAuthrized?.value) {
//     throw redirect(302, "/portal/signin")
//   }
// }

// export default component$(() => {
//   const { modalState } = useContext(ContextIdGlobalState)
//   const { userState } = useAuth()
//   return (
//     <section>
//       <Breadcrumbs />
//       {!modalState.showModal ? (
//         <IndexOrders orderObjArr={obj} />
//       ) : (
//         <div>Nothing to show here</div>
//       )}
//     </section>
//   )
// })

const LoggedIn = component$(() => {
  return <>Hey I am logged in!</>
})
const LoggedOut = component$(() => {
  // const nav = useNavigate()
  // nav("/portal/signin/")
  return <>loading.....💎</>
})

export default component$(() => {
  const { sessionState } = useAuth()
  const { modalState } = useContext(ContextIdGlobalState)
  const nav = useNavigate()

  const flag = useStore({ render: false })

  useVisibleTask$(({ track }) => {
    track(() => sessionState.navigateToSignIn)
    if (sessionState.navigateToSignIn) {
      modalState.modalCode = "MODAL_USER_SIGNIN"
      modalState.showModal = true
      //nav("/portal/signin")
      sessionState.navigateToSignIn = false
    } else if (sessionState.userName) flag.render = true
  })

  return (
    <>
      {flag.render && (
        <div>
          <LoggedIn />
        </div>
      )}
    </>
  )
})
