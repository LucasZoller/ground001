import { useContext, useTask$, useVisibleTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../context/ContextGlobalState"
import { ContextIdAuthState } from "../context/ContextAuthState"
import { ContextIdUserState } from "../context/ContextUserState"
import { authUserSendAccessToken } from "../helpers/auth-user-send-access-token"
import { authUserSendRefreshToken } from "../helpers/auth-user-send-refresh-token"
import { authUpdateUserData } from "../helpers/auth-update-user-data"

export const useAuth = (path: string) => {
  const { sessionState } = useContext(ContextIdGlobalState)
  const authState = useContext(ContextIdAuthState)
  const userState = useContext(ContextIdUserState)

  useTask$(async ({ track }) => {
    track(() => authState.at)
    if (authState.at && sessionState.atExp) {
      // 1: AT exists
      if (Number(sessionState.atExp) > Date.now()) {
        const data = await authUserSendAccessToken(authState, userState, path) // 1-1: At is valid
        await authUpdateUserData(userState, data)
      } else {
        sessionState.needVisibleTaskToGetRt = true // 2-1: AT exists, but is expired or invalid
      }
    } else {
      sessionState.needVisibleTaskToGetRt = true // 2-2: AT is absent.
    }
  })
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(
    async ({ track }) => {
      // 2 : AT is absent or expired/invalid.
      track(() => sessionState.needVisibleTaskToGetRt)
      track(() => sessionState.isValidRtFound)
      if (sessionState.needVisibleTaskToGetRt && sessionState.isValidRtFound) {
        // 2-1-1: AT is expired or invalid. RT is in the cookie and is valid. => update AT
        // 2-2-1: AT is absent. RT is in the cookie and is valid. => update AT
        try {
          await authUserSendRefreshToken(authState, sessionState, path)
        } catch (err) {
          // 2-1-2: AT is expired or invalid. RT returned error.
          // 2-2-2: AT is absent. RT returned error.
        }

        sessionState.needVisibleTaskToGetRt = false
      } else {
        // 2-1-3: AT is expired or invalid. RT is absent.
        // 2-2-3: AT is absent. RT is absent.
      }
    },
    { strategy: "document-ready" }
  )
  return { userState, sessionState }
}
