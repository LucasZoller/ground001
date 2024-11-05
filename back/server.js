import Fastify from "fastify"
import "dotenv/config"

import fastifyCookie from "@fastify/cookie"

import { customCorsPlugin } from "./plugins/customCorsPlugin.js"
import { customErrorHandlerPlugin } from "./plugins/customErrorHandlerPlugin.js"
import { verifyAccessTokenPlugin } from "./plugins/verifyAccessTokenPlugin.js"

import { authUserCreate } from "./route-handlers/auth-user-create.js"
import { authUserLogin } from "./route-handlers/auth-user-login.js"
import { publishAtFromRtPlugin } from "./route-handlers/auth-publish-at-from-rt.js"
import { userProtectedTest } from "./route-handlers/user-protected-test.js"

import { test001 } from "./route-handlers/test001.js"
import { authTest } from "./route-handlers/authTest.js"

import { cookieSettingTest } from "./route-handlers/cookie-setting-test.js"

const startServer = async () => {
  try {
    const fastify = Fastify({ logger: true })

    await fastify.register(customCorsPlugin)
    await fastify.register(fastifyCookie)
    await fastify.register(customErrorHandlerPlugin)
    await fastify.register(verifyAccessTokenPlugin)

    fastify.get("/test", test001)

    // Routes 1. auth
    fastify.post("/auth-user-create", authUserCreate)

    fastify.post("/auth-user-login", authUserLogin)
    fastify.post("/auth-publish-at-from-rt", publishAtFromRtPlugin)

    fastify.post("/cookie-test", cookieSettingTest)

    // /auth-user-login
    // /auth-user-logout
    // /auth-publish-at-from-rt
    // /auth-verify-at
    // /auth-password-reset-request – For requesting a password reset email or token.
    // /auth-password-reset-confirm – For confirming the password reset using the token sent to the user.
    // /auth-change-password – For changing the user password (usually after login).
    // /auth-account-verify – For verifying the user account via email verification link
    // /auth-revoke-refresh-token – For revoking refresh tokens (useful for invalidating tokens in case of logout or other scenarios).
    // /auth-session-info – For fetching active session information, such as the current state of refresh tokens or login status.

    // Routes 2. protected
    fastify.get("/user-area-test", { preHandler: fastify.verifyAccessToken }, userProtectedTest)
    fastify.get("/auth-test", authTest)

    const mo = process.env.MO
    const port = process.env.PORT
    await fastify.listen({ port: port })
    console.log(mo)
  } catch (err) {
    console.log("Failed to start server:", err)
    process.exit(1)
  }
}

startServer()
