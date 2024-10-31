import { BACK_URL } from "../config"
import wretch from "wretch"
import { AuthState, SessionState, UserState } from "../types"
import { $ } from "@builder.io/qwik"

export const authUserSendRefreshToken = $(
  async (
    authState: AuthState,
    sessionState: SessionState,
    backendPath: string
  ) => {
    console.log(
      "🎪🎪🎪🎪🎪🎪 Entered sendRefreshToken => :🎪🎪🎪 1. Now sending httpOnly RT from browser..."
    )

    const data = await wretch(`${BACK_URL}/auth-publish-at-from-rt`)
      .options({ credentials: "include" })
      .post()
      .json<UserState>()
    console.log(
      "🎪🎪🎪2. RT was sent via httpOnly cookie. Do we have the new AT???🎀🎀🎀 : ",
      data
    )
    if (data.at && data.atExp) {
      authState.at = data.at
      sessionState.atExp = data.atExp
      console.log("🎪🎪🎪3. AT value in memory is now updated : ", authState.at)
      console.log(
        "🎪🎪🎪3. atExp value in memory is now updated : ",
        sessionState.atExp
      )
    }
  }
)
