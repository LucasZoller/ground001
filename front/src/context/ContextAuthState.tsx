import { component$, createContextId, useContextProvider, useStore, Slot } from "@builder.io/qwik"
import { AuthState } from "../types"

export const ContextIdAuthState = createContextId<AuthState>("context-id-auth-state")

export const ContextProviderAuthState = component$(() => {
  const authState = useStore({
    at: ""
  })

  // Provide the context to children components
  useContextProvider(ContextIdAuthState, authState)

  return (
    <>
      <Slot />
    </>
  )
})
