import { component$, createContextId, useContextProvider, useStore, Slot } from "@builder.io/qwik"
import { UserState } from "../types"

// The constant holding `createContextId()` is the identifier to pass to `useContext()`.
// This constant bundles both the string identifier and the associated type.

export const ContextIdUserState = createContextId<UserState>("context-id-user-state")

// Create the context provider component
export const ContextProviderUserState = component$(() => {
  // Initialize the store with default state
  const userState = useStore({
    status: "",
    message: "",
    user_code: "",
    lang: "",
    user_name: "",
    email: "",
    created_at: "",
    last_modified_at: "",
    hashed_rt: "",
    a_token: ""
  })

  // Provide the context to children components
  useContextProvider(ContextIdUserState, userState)

  return (
    <>
      <Slot />
    </>
  )
})

// The argument ("login-modal-context") is a string identifier for this context,
// and it is used internally by Qwik as a label or key.
//
// The actual context identifier "We" use, is the constant "GlobalContext".
// NOT THE STRING ("login-modal-context") ITSELF.
//
// We pass `GlobalContext` (the constant) to `useContext()` in order to use this context in different components.
// `GlobalContext` (the constant) bundles together both the string identifier and the associated type.
//
// By passing `ModalContext` (the constant) to `useContext`, we get the benefits of TypeScript's type safety.
// The createContextId function ties the string identifier to a specific type,
// ensuring that whenever we use this context in our app,
// TypeScript can check that we're accessing and modifying the context's state correctly.
// If we were to pass a string like `"login-modal-context"` directly, we would lose the type safety that TypeScript provides,
// and the association between the string and its corresponding data structure would be more fragile.
//
// The string identifier is helpful for debugging purposes.
// In Qwik’s internal tooling or logs, we might see references to this string, which helps us track down which context is being used.