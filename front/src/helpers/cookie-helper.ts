import { server$ } from "@builder.io/qwik-city"
import { BACK_URL } from "../config"
import wretch from "wretch"
import type { SuccessfulSignInPayload } from "../types"

export const getCookieHelper = server$(function async() {
  const at = this.cookie.get("torch")?.value
  const atExp = this.cookie.get("flameout")?.value
  const rt = this.cookie.get("revive")?.value
  const rtExp = this.cookie.get("end")?.value

  return { at, atExp, rt, rtExp }
})

export const setCookieHelper = server$(function async(rt: string, rtExp: string, rtMaxAge: string, at: string, atExp: string, atMaxAge: string) {
  this.cookie.set("torch", at, { path: "/", httpOnly: true, secure: true, sameSite: "Lax", maxAge: parseInt(atMaxAge) })
  this.cookie.set("flameout", atExp, { path: "/", httpOnly: false, secure: true, sameSite: "Lax", maxAge: parseInt(atMaxAge) })
  this.cookie.set("revive", rt, { path: "/", httpOnly: true, secure: true, sameSite: "Lax", maxAge: parseInt(rtMaxAge) })
  this.cookie.set("end", rtExp, { path: "/", httpOnly: false, secure: true, sameSite: "Lax", maxAge: parseInt(rtMaxAge) })
})

export const sendCookieHelper = server$(function async(rt: string) {
  const data = wretch(`${BACK_URL}/auth-publish-at-from-rt`).options({ credentials: "include" }).post().json<SuccessfulSignInPayload>()
  return data
})
