import { server$ } from "@builder.io/qwik-city"
import { BACK_URL } from "../config"
import wretch from "wretch"
import type { SuccessfulSignInPayload } from "../types"

export const getCookieHelper = server$(function async() {
  const at = this.cookie.get("torch")?.value

  const rt = this.cookie.get("revive")?.value

  return { at, rt }
})

export const setCookieHelper = server$(function async(rt: string, rtMaxAge: string, at: string, atMaxAge: string) {
  this.cookie.set("torch", at, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    maxAge: parseInt(atMaxAge),
  })
  //this.cookie.set("flameout", atExp, { path: "/", httpOnly: false, secure: true, sameSite: "Lax", maxAge: parseInt(atMaxAge) })
  this.cookie.set("revive", rt, {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "Lax",
    maxAge: parseInt(rtMaxAge),
  })
  //this.cookie.set("end", rtExp, { path: "/", httpOnly: false, secure: true, sameSite: "Lax", maxAge: parseInt(rtMaxAge) })
})

export const sendCookieHelper = server$(function async(rt: string) {
  const data = wretch(`${BACK_URL}/auth-publish-at-from-rt`).options({ credentials: "include" }).post().json<SuccessfulSignInPayload>()
  return data
})

type CookieOptions = {
  path?: string
  maxAge?: number
  sameSite?: "Lax" | "Strict" | "None" | "lax" | "strict" | "none"
  httpOnly?: boolean
  secure?: boolean
}

export const cookieOptionHelper = (maxAge: string): CookieOptions => {
  return {
    path: "/",
    maxAge: parseInt(maxAge),
    sameSite: "Lax",
    httpOnly: true,
    secure: true,
  }
}

export const cookieHelper = (cookieMethod: any, rt: string, rtExp64: string, rtMaxAge: string, at: string, atExp64: string, atMaxAge: string) => {
  cookieMethod.set("revive", rt, {
    path: "/",
    maxAge: parseInt(rtMaxAge),
    sameSite: "Lax",
    httpOnly: true,
    secure: true,
  })
  cookieMethod.set("torch", at, {
    path: "/",
    maxAge: parseInt(atMaxAge),
    sameSite: "Lax",
    httpOnly: true,
    secure: true,
  })
  cookieMethod.set("end", rtExp64, {
    path: "/",
    maxAge: parseInt(rtMaxAge),
    sameSite: "Lax",
    httpOnly: true,
    secure: true,
  })
  cookieMethod.set("flameout", atExp64, {
    path: "/",
    maxAge: parseInt(atMaxAge),
    sameSite: "Lax",
    httpOnly: true,
    secure: true,
  })
}

export const tokenLifeChecker = server$(function () {
  const at = this.cookie.get("torch")?.value
  const rt = this.cookie.get("revive")?.value
  const isAtAlive = !!at // false if at is undefined
  const isRtAlive = !!rt // false if rt is undefined
  return { isAtAlive, isRtAlive }
})
