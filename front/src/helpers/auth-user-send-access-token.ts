import { $ } from "@builder.io/qwik"
import { BACK_URL } from "../config"
import type { UserState, SessionState } from "../types"
import wretch from "wretch"

export const authUserSendAccessToken = $(async (sessionState: SessionState) => {
  const data = await wretch(`${BACK_URL}/user-area-test`)
    .headers({ authorization: `Bearer ${sessionState.at}` })
    .get()
    .json<UserState>()

  return data
})
