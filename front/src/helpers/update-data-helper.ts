import type { SuccessfulSignInPayload, SessionState } from "../types"

type TempSessionState = {
  userName?: string
  cart?: string[]
  lang?: string
  needVisibleTask?: boolean
  at?: string
  atExp?: string
  atExpInSec?: string
  rt?: string
  rtExp?: string
  rtExpInSec?: string
}

export const updateTempDataHelper = (tempStore: TempSessionState, payload: SuccessfulSignInPayload) => {
  //Basic user info
  tempStore.userName = payload.userName
  tempStore.cart = payload.cartItems
  tempStore.lang = payload.lang
  //Access token
  tempStore.at = payload.at
  tempStore.atExp = payload.atExp
  tempStore.atExpInSec = payload.atExpInSec
  //Refresh token
  tempStore.rt = payload.rt
  tempStore.rtExp = payload.rtExp
  tempStore.rtExpInSec = payload.rtExpInSec
  return tempStore
}

export const updateSessionStateHelper = (sessionState: SessionState, tempStore: TempSessionState) => {
  sessionState.cart = tempStore.cart
  sessionState.lang = tempStore.lang
  sessionState.userName = tempStore.userName
}
