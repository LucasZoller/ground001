import type { RequestHandler } from "@builder.io/qwik-city"

export const onRequest: RequestHandler = async ({ headers }) => {
  console.log("🎪🎪🎪Hey from api/auth/basic-user-check 14:45!!!", headers)
}
