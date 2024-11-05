import { $, useContext } from "@builder.io/qwik"
import type { UserSignInPayload, SuccessfulSigninPayload } from "../types"
import { BACK_URL } from "../config"
import wretch from "wretch"

import { ContextIdGlobalState } from "../context/ContextGlobalState"
import { ContextIdAuthState } from "../context/ContextAuthState"
import { useNavigate } from "@builder.io/qwik-city"

export const useSignInUser = () => {
  const { sessionState } = useContext(ContextIdGlobalState)
  const nav = useNavigate()
  const authState = useContext(ContextIdAuthState)
  const signInUser = $(async (payload: UserSignInPayload) => {
    try {
      const data = await wretch(`${BACK_URL}/auth-user-login`).options({ credentials: "include" }).post(payload).json<SuccessfulSigninPayload>()
      authState.at = data.at
      sessionState.atExp = data.atExp
      sessionState.cart = data.cartItems
      sessionState.lang = data.lang
      sessionState.userName = data.userName

      console.log("authState at is this  : ", authState.at)
      nav("/account")
      console.log("🎉🎉✨sessionState.atExp", sessionState.atExp)
    } catch (err) {
      //In case of some network error
      sessionState.userName = ""
    }

    //return data
  })
  return signInUser
}
