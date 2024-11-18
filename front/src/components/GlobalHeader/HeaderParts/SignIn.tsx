import { component$, useContext, useTask$ } from "@builder.io/qwik"

import { ContextIdGlobalState, ContextIdSimpleState } from "../../../context/ContextGlobalState"

import { AccountMenu } from "./AccountMenu"

import { modalCodes } from "../../../config"
import { server$ } from "@builder.io/qwik-city"

// export const getUserCode = server$(async ({ sharedMap }) => {
//   const data = await sharedMap.get("val1")

//   return data
// })

export const SignIn = component$(() => {
  const { modalState, sessionState } = useContext(ContextIdGlobalState)
  const simpleState = useContext(ContextIdSimpleState)
  // useTask$(({ track }) => {
  //   track(() => sessionState.userName)
  //   track(() => sessionState.lang)
  //   console.log(
  //     "SignIn.tsx useTask sessionState.userName : ",
  //     sessionState.userName
  //   )
  //   console.log("SignIn.tsx useTask sessionState.lang : ", sessionState.lang)
  //   sessionState.lang = sessionState.userName
  // })
  return (
    <>
      <div class="flex gap5 hover-target">
        <div class="pointer flex" style={{ height: `60px;` }} onClick$={() => (modalState.modalCode = modalCodes.MODAL_USER_SIGNIN)}>
          {/* <IconPerson /> */}
          <div class="ma font-8">{sessionState.userName === "" ? `Hello guest, sign in🎀` : `Welcome back, ${sessionState.userName}!🎀`}</div>
        </div>

        <AccountMenu />
      </div>
    </>
  )
})
