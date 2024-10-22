import { $ } from "@builder.io/qwik"
import { UserState } from "../types"

export const authUpdateUserData = $(async (userState: UserState, data: UserState) => {
  // This updates set of store values which is userState.
  userState.created_at = data.created_at
  userState.email = data.email
  userState.hashed_rt = data.hashed_rt
  userState.lang = data.lang
  userState.last_modified_at = data.last_modified_at
  userState.message = data.message
  userState.status = data.status
  userState.user_code = data.user_code
  userState.user_name = data.user_name
})
