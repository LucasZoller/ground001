// src/routes/account/layout.tsx
import { component$, Slot, useContext } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"

import { ContextProviderUserState } from "../../context/ContextUserState"

import { ContextIdGlobalState } from "~/context/ContextGlobalState"

export default component$(() => {
  // const { sessionState } = useContext(ContextIdGlobalState)
  // console.log("Testing is I can access context values now from the layout in the root of protected route! ", sessionState.at)
  return (
    <>
      <ContextProviderUserState>
        <Slot />
      </ContextProviderUserState>

      <div class="flex ptb5">
        <Link href="/account" class="mini-button-grape w300px ma">
          Account top
        </Link>
      </div>
    </>
  )
})
