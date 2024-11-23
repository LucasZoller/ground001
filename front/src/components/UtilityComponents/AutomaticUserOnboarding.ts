import { component$, useContext, useTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../context/ContextGlobalState"

type BasicSessionState = {
  props: { userCode: string; cart: string[]; lang: string } | undefined
}

export default component$((obj: BasicSessionState) => {
  // ***This component runs once on initial render only.***
  // Recieves props from the routeLoader inside root layout, and updates the sessionState.
  const { sessionState } = useContext(ContextIdGlobalState)

  useTask$(() => {
    obj.props?.userCode !== undefined &&
      (sessionState.userName = obj.props.userCode)
    obj.props?.cart !== undefined && (sessionState.cart = obj.props.cart)
    obj.props?.lang !== undefined && (sessionState.lang = obj.props.lang)
  })

  return null
})
