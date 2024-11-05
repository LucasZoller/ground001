import { component$, useContext } from "@builder.io/qwik"

import { ContextIdGlobalState } from "../../../context/ContextGlobalState"

import { AccountMenu } from "./AccountMenu"

import { modalCodes } from "../../../config"
import { IconPerson } from "../../SvgComponents/Icon"

export const SignIn = component$(() => {
  const { modalState, sessionState } = useContext(ContextIdGlobalState)

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
