import { useContext, useStore, useVisibleTask$ } from "@builder.io/qwik"
import { server$ } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "~/context/ContextGlobalState"

export const useTestHook = (at: string | undefined) => {
  const tempState = useStore({
    v: ""
  })
  const setCookie = server$(function async(val1: string, val2: string2) {
    this.cookie.set(val1, val2)
  })
  //const { sessionState } = useContext(ContextIdGlobalState)
  useVisibleTask$(() => {
    setCookie("Yes-We-need-clever-way-to-set-cookie", "Check is this working??")
    //sessionState.at = "this test is working!"
    tempState.v = "Updating temp store works"
    console.log("testing if the hook is working inside root layout!", "sessionState.at")
    console.log("testing if the hook is working inside root layout!", tempState.v)
  })
}
