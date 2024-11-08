import { useContext, useTask$ } from "@builder.io/qwik"
import { useNavigate } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "../context/ContextGlobalState"
import { ContextIdUserState } from "../context/ContextUserState"
import { authUserSendAccessToken } from "../helpers/auth-user-send-access-token"
import { authUpdateUserData } from "../helpers/auth-update-user-data"

export const useAuth = () => {
  const { sessionState, modalState } = useContext(ContextIdGlobalState)
  const userState = useContext(ContextIdUserState)
  const nav = useNavigate()
  //Only check the validity of AT.
  //Let AutomaticUserLogin use RT to get new AT.
  //AutomaticUserLogin sets AT as sessionState in the useVisibleTask$.

  useTask$(async ({ track }) => {
    track(() => sessionState.at)
    // Trigger AutomaticUserLogin if at and atExp is not found in the memory.

    if (sessionState.at && sessionState.atExp) {
      // 1: at and atExp are both in memory
      if (Number(sessionState.atExp) > Date.now()) {
        const data = await authUserSendAccessToken(sessionState) // 1-1: At is valid
        await authUpdateUserData(userState, data)
      } else {
        sessionState.needAutomaticUserSignIn++ // 2-1: AT exists, but is expired or invalid
        sessionState.at = "" // If AT is old, automaticUserSignIn hasn't updated the at yet.
      }
    } else {
      sessionState.needAutomaticUserSignIn++ // 2-2: AT is absent.
    }
  })

  return { userState, sessionState }
}
