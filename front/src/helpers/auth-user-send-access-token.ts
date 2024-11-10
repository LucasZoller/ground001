import { $ } from "@builder.io/qwik"
import { BACK_URL } from "../config"
import type { UserState, SessionState } from "../types"
import wretch from "wretch"

export const authUserSendAccessToken = $(async (at: string, backendPath: string) => {
  const data = await wretch(`${BACK_URL}${backendPath}`)
    .headers({ authorization: `Bearer ${at}` })
    .get()
    .json<any>()
  // ****Why type "any"???****
  // For now, we don't know what the backend will return.
  // For example, "/account/items" and "/account/order" have different payload.
  // But the payload related to the user profile is always the same.
  // Maybe the data object (the payload) should have two properties.
  // "basic" object for user profile and "routeSpecific" object for the route specific set of data.

  return data
})
