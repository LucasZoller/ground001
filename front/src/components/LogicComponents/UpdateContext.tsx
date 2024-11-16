import {
  component$,
  useContext,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik"
import {
  ContextIdGlobalState,
  ContextIdSimpleState,
} from "../../context/ContextGlobalState"

import wretch from "wretch"
import { BACK_URL } from "../../config"
import { server$ } from "@builder.io/qwik-city"
import type { SuccessfulSignInPayload } from "../../types"

type obj = {
  val: {
    performMemoryCheck: boolean | undefined
    userName: string | undefined
    cart: string[] | undefined
    lang: string | undefined
    rt: string | undefined
  }
}

export const setCookie = server$(function async(rt, rtMaxAge, at, atMaxAge) {
  this.cookie.set("revive", rt, {
    path: "/",
    secure: true,
    sameSite: "Lax",
    httpOnly: true,
    maxAge: rtMaxAge,
  })
  this.cookie.set("torch", at, {
    path: "/",
    secure: true,
    sameSite: "Lax",
    httpOnly: true,
    maxAge: atMaxAge,
  })
})

export default component$((prop: obj) => {
  console.log("👀👀👀UpdateContextComponent received prop : ", prop.val)
  const { sessionState } = useContext(ContextIdGlobalState)
  const simpleState = useContext(ContextIdSimpleState)
  const flag = useStore({
    needVisibleTask: false,
    nu: false,
    needTask3: false,
  })
  const values = useStore({
    rt: "",
    rtMaxAge: "",
    at: "",
    atMaxAge: "",
  })
  const temp = useStore({
    userName: "",
    lang: "",
  })
  useTask$(async () => {
    if (prop.val.performMemoryCheck) {
      // When performMemoryCheck is true, we have two scenario :
      // 1 : Page reload or stateless-revisit (Browser state reset) => Fetch the state.
      // 2 : Regular navigation (Browser state in tact) => Keep the state as are. Do nothing.
      if (sessionState.userName === "") {
        // 1 : Page reload or stateless-revisit
        const rt = prop.val.rt

        if (rt) {
          console.log("what is the sessionState.lang? : ", sessionState.lang)
          sessionState.lang = "Initial state"
          sessionState.userName = "Initial state userName"

          console.log("what is the sessionState.lang? : ", sessionState.lang)
          const payload = await wretch(`${BACK_URL}/auth-publish-at-from-rt`)
            .headers({ authorization: `Bearer ${rt}` })
            .get()
            .json<SuccessfulSignInPayload>()

          // Values to update cookies
          values.rt = payload.rt
          values.rtMaxAge = payload.rtExpInSec
          values.at = payload.at
          values.atMaxAge = payload.atExpInSec

          // Update userName
          temp.userName = `${payload.userName}🦞` //*** UPDATE DOESN'T REFRECT ON THE DISPLAY***
          temp.lang = `${payload.lang}🦞`

          // Run useVisibleTask
          flag.needVisibleTask = true
        }
      } else return // 2 : Regular navigation
    } else {
      // When performMemoryCheck is false, we have two patterns :
      // 1 : Both AT and RT is empty. Treat this user is a Guest.
      // 2-a : User came back to the site after 4 hours or 2 days. (No memory)
      // 2-b : User left the PC and the browser open for 4 hours or 3 days. (Store values in tact)
      // Both 2-a/2-b need AT, and for that, we access DB anyway.
      // So fetch everything altogether, and update the context store values.
      console.log("⏰⏰⏰⏰What the fuck is this", prop.val)
      sessionState.userName = prop.val.userName //***UPDATE WORKS HERE ***
      sessionState.lang = prop.val.lang //***UPDATE WORKS HERE ***
    }
  })

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track }) => {
    track(() => flag.needVisibleTask)
    if (flag.needVisibleTask) {
      //set cookie
      await setCookie(values.rt, values.rtMaxAge, values.at, values.atMaxAge)
      sessionState.userName = temp.userName
      sessionState.lang = temp.lang
      flag.needVisibleTask = false
      console.log(sessionState.userName) //*** UPDATE SHOWS UP IN THE LOG NO PROBLEM***
      console.log(sessionState.lang) //*** UPDATE SHOWS UP IN THE LOG NO PROBLEM***
    }
  })

  return null
})
