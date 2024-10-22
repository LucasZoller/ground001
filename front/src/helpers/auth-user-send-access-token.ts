import { BACK_URL } from "../config"
import wretch from "wretch"
import { UserState, AuthState } from "../types"
import { $ } from "@builder.io/qwik"

export const authUserSendAccessToken = $(async (authState: AuthState, userState: UserState, backendPath: string) => {
  console.log("🎠🎠🎠🎠🎠🎠 Entered sendAccessToken => : Do we have access token in the global state?", authState.at)
  const data = await wretch(`${BACK_URL}${backendPath}`)
    .headers({ authorization: `Bearer ${authState.at}` })
    .get()
    .json<UserState>()
  console.log("🎠🎠🎠🎠🎠🎠 AT worked. This is the fetched data:", data)

  return data
})
