// src/routes/account/layout.tsx
import { component$, Slot } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { useAuth } from "../../hooks/useAuth"
import { ContextProviderUserState } from "../../context/ContextUserState"

export default component$(() => {
  const { userState, sessionState } = useAuth("/user-area-test")
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
