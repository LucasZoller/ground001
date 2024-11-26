import wretch from "wretch"
import { BACK_URL } from "../config"
import { ProtectedData } from "../types"

export const fetchProtectedDataHelper = async (cookieMethod: any, protectedPath: string) => {
  const at = cookieMethod.get("torch")?.value // If AT was set in CASE 2-1, the AT here is the newly set AT.
  if (!at) return // e.g. prefetch => 1 week => navigation
  try {
    const data = await wretch(`${BACK_URL}${protectedPath}`) // Use AT to fetch protected data.
      .headers({ at: `Bearer ${at}` }) // Use headers for reliability, control and security.
      .get()
      .json<ProtectedData>() // Protected data we need for this page.
    return data
  } catch (err) {
    console.log(err)
  }
}

export const fetchProtectedDataHelperWithParam = async (cookieMethod: any, protectedPath: string, param: string) => {
  const at = cookieMethod.get("torch")?.value // If AT was set in CASE 2-1, the AT here is the newly set AT.
  if (!at) return // e.g. prefetch => 1 week => navigation
  try {
    const data = await wretch(`${BACK_URL}${protectedPath}`) // Use AT to fetch protected data.
      .headers({ at: `Bearer ${at}`, param: `param ${param}` }) // Use headers for reliability, control and security.
      .get()
      .json<ProtectedData>() // Protected data we need for this page.
    return data
  } catch (err) {
    console.log(err)
  }
}
