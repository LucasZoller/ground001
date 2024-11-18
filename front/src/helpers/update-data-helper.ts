import type { SuccessfulSignInPayload, SessionState } from "../types"

type TempSessionState = {
  userName?: string
  cart?: string[]
  lang?: string
  at?: string
  atExpInSec?: string
  rt?: string
  rtExpInSec?: string
}

type ConcisePayload = {
  userName?: string
  cart?: string[]
  lang?: string
}

export const updateTempDataHelper = (tempStore: TempSessionState, payload: SuccessfulSignInPayload) => {
  //Basic user info
  tempStore.userName = payload.userName
  tempStore.cart = payload.cartItems
  tempStore.lang = payload.lang
  //Access token
  tempStore.at = payload.at
  tempStore.atExpInSec = payload.atExpInSec
  //Refresh token
  tempStore.rt = payload.rt
  tempStore.rtExpInSec = payload.rtExpInSec

  return tempStore
}

export const updateSessionStateHelper = (sessionState: SessionState, tempStore: TempSessionState | ConcisePayload) => {
  sessionState.cart = tempStore.cart
  sessionState.lang = tempStore.lang
  sessionState.userName = tempStore.userName
}
