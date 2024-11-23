import { component$ } from "@builder.io/qwik"
import { RequestEvent, routeLoader$ } from "@builder.io/qwik-city"

import type { SuccessfulSignInPayload, ProtectedData } from "../../../../types"
import { cookieHelper } from "../../../../helpers/cookie-helper"
import { BACK_URL } from "../../../../config"
import wretch from "wretch"

// CASE 2-1, 2-2 : Can't reach here without AT.
export const useProtectedDataLoader = routeLoader$(async ({ cookie, redirect, params }) => {
  console.log("the shape of param", params)
  const at = cookie.get("torch")?.value // If AT was set in CASE 2-1, the AT here is the newly set AT.
  if (!at) throw redirect(302, "/portal/signin") // Can not normally happen. Immediately redirect.
  try {
    const data = await wretch(`${BACK_URL}/protected/account-wishlist`) // Use AT to fetch protected data.
      .headers({ at: `Bearer ${at}`, listname: `${params.listname}` }) // Use headers for reliability, control and security.
      .get()
      .json<ProtectedData>() // Protected data we need for this page.
    return data
  } catch (err) {
    console.log(err)
  }
})

export default component$(() => {
  return <>Hey hello!</>
})
