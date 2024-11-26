import { component$, Slot } from "@builder.io/qwik"
import { Link, RequestHandler } from "@builder.io/qwik-city"

import { ContextProviderUserState } from "../../context/ContextUserState"

import wretch from "wretch"
import { BACK_URL } from "../../config"
import type { SuccessfulSignInPayload } from "../../types"
import { cookieHelper } from "../../helpers/cookie-helper"

// onGet will be triggered by prefetch.
export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  console.log(`${Math.random()}🐞🐞🐞Tell me if the layout is triggered!`)
  const rt = cookie.get("revive")?.value

  if (!rt) throw redirect(302, "/portal/signin") // Guest user. Not allowed at protected routes.
  const at = cookie.get("torch")?.value // undefined if absent
  if (!at) {
    // e.g. A user navigating to protected route 1 week after the publish of AT by the root layout.
    // CASE 2-1 : Get AT from RT. Update both RT&AT in the cookie.
    try {
      const payload = await wretch(`${BACK_URL}/auth-publish-at-from-rt`)
        .headers({ authorization: `Bearer ${rt}` })
        .get()
        .json<SuccessfulSignInPayload>()

      // Shape of payload {userName, cart, lang, rt, rtExpInBase64Url, rtExpInSec, at, atExpInBase64Url, atExpInSec }
      cookieHelper(cookie, payload.rt, payload.rtExpInBase64Url, payload.rtExpInSec, payload.at, payload.atExpInBase64Url, payload.atExpInSec)
    } catch (err: any) {
      //Error during "wretch(`${BACK_URL}/auth-publish-at-from-rt`)"
      throw redirect(302, "/portal/signin")
    }
  }
}
export default component$(() => {
  return (
    <>
      <ContextProviderUserState>
        <Slot />
      </ContextProviderUserState>

      <div class="flex ptb5">
        <Link href="/account" class="mini-button-grape w300px ma">
          Account top
        </Link>
      </div>
    </>
  )
})
