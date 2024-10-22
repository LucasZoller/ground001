import { $, useContext } from "@builder.io/qwik"
import { UserSignInPayload, DatabaseResponse } from "../types"
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
    const data = await wretch(`${BACK_URL}/auth-user-login`).options({ credentials: "include" }).post(payload).json<DatabaseResponse>()

    //if (data.dbSays) loginStateChanger(data.dbSays)

    if (data.at && data.atExp) {
      authState.at = data.at
      sessionState.atExp = data.atExp
      nav("/account")
    }
    console.log("🎉🎉✨sessionState.atExp", sessionState.atExp)
    //return data
  })
  return signInUser
}
