import { component$, useContext, useTask$, useVisibleTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../context/ContextGlobalState"
import { base64StringToNumberConverter } from "../../helpers/string-helpers"
import wretch from "wretch"
import { BACK_URL } from "../../config"
import type { SuccessfulSigninPayload } from "../../types"

import { server$ } from "@builder.io/qwik-city"

export const handleCookies = server$(function async() {
  const rt = this.cookie.get("cltoken")?.value
  const siteSession = this.cookie.get("site-session")?.value

  return { rt, siteSession }
})

//This component does nothing if userName already exists in the browser's memory.
//Also, this component doesn't check the validity of AT, eventhough it is present in the memorey.

export default component$(() => {
  const { sessionState } = useContext(ContextIdGlobalState)

  useTask$(async () => {
    if (sessionState.userName.length < 1) {
      //Code will run ONLY if the borwser's memory state is empty. (First visit or browser refresh)

      const { rt, siteSession } = await handleCookies()
      try {
        //1: Stop here if rt and siteSession are both not present in the browser.
        if (!siteSession || !rt) throw Error("Step1 : cltoken or site-session is not present in the browser.")

        // 2: Decode the site-session from base64 to number.
        const siteSessionTimeStamp = base64StringToNumberConverter(siteSession)
        if (siteSessionTimeStamp <= Date.now()) throw Error("Step2 : site-session is expired.")
      } catch (err: any) {
        console.log("🎈🎈🎈Error from handleCookies : ", err.message)
        sessionState.needVisibleTask = false
        sessionState.userName = ""
      }

      sessionState.needVisibleTask = true
    }
  })

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async ({ track }) => {
    track(() => sessionState.needVisibleTask)
    if (sessionState.needVisibleTask) {
      console.log("hey! usevisibletask is running!🎗🎀🎀🎀")
      //Entering here means, rt is present and not expired.
      //If the user is not malicious, the backend should respond normally.

      //3: Get userName, at, atExp, cartItems, lang and set them as sessionState.
      try {
        const data = await wretch(`${BACK_URL}/auth-publish-at-from-rt`).options({ credentials: "include" }).post().json<SuccessfulSigninPayload>()
        console.log(data)
        sessionState.userName = data.userName
        sessionState.cart = data.cartItems
        sessionState.lang = data.lang
        //We set at and atExp as sessionState, for later use in the protected routes.
        sessionState.at = data.at
        sessionState.atExp = data.atExp
      } catch (err) {
        console.log("Network issue. Please retry later.", err)
        sessionState.needVisibleTask = false
        sessionState.userName = ""
      }
    }
  })

  return <></>
})
