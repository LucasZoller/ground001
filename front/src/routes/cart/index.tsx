import { component$, useContext, useStore, useTask$ } from "@builder.io/qwik"
import wretch from "wretch"
import { ContextIdAuthState } from "../../context/ContextAuthState"

export const testAuth = async (bo: string) => {
  const result = await wretch("http://localhost:43718/api/protected/")
    .headers({ Authorization: `Bearer ${bo}` })
    .get()
    .json()
  console.log("From inside testAuth", result)
  return result
}

export default component$(() => {
  const authState = useContext(ContextIdAuthState)
  console.log("👽👽👽👽this is the authState : ", authState.at)

  const result = testAuth(authState.at)
  console.log("something I got : ", result)

  return <div>I am shopping cart🛒</div>
})
