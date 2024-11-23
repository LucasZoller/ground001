import Fastify from "fastify"
import "dotenv/config"

// Import plugins
import fastifyCookie from "@fastify/cookie"
import { customCorsPlugin } from "./plugins/customCorsPlugin.js"
import { customErrorHandlerPlugin } from "./plugins/customErrorHandlerPlugin.js"
import { authUserPlugin } from "./plugins/authUserPlugin.js" // Verifies AT

// Import route handlers
import { authUserCreate } from "./route-handlers/auth-user-create.js"
import { authUserSignIn } from "./route-handlers/auth-user-signin.js"
import { authPublishAtFromRt } from "./route-handlers/auth-publish-at-from-rt.js" //Verifies RT

import { userProtectedTest } from "./route-handlers/user-protected-test.js"
import { accountItems } from "./route-handlers/account-items.js"
import { accountOrders } from "./route-handlers/account-orders.js"
import { accountSecurity } from "./route-handlers/account-security.js"
import { accountSettings } from "./route-handlers/account-settings.js"
import { accountWishlist } from "./route-handlers/account-wishlist.js"

const startServer = async () => {
  try {
    const fastify = Fastify({ logger: true })

    // Plugins
    await fastify.register(fastifyCookie)
    await fastify.register(customCorsPlugin)
    await fastify.register(customErrorHandlerPlugin)
    await fastify.register(authUserPlugin)

    // Routes
    // 01: Auth
    fastify.post("/auth-user-create", authUserCreate)
    fastify.post("/auth-user-signin", authUserSignIn)
    fastify.get("/auth-publish-at-from-rt", authPublishAtFromRt)

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

    // 02: Protected
    //🥦🥦🥦🥦↓↓↓↓↓↓↓↓↓MAKE THIS WORK!!!!!!!🥦🥦🥦🥦
    fastify.get("/protected-item", { preHandler: fastify.authUser }, userProtectedTest)

    fastify.get("/protected/account-items", { preHandler: fastify.authUser }, accountItems)
    fastify.get("/protected/account-orders", { preHandler: fastify.authUser }, accountOrders)
    fastify.get("/protected/account-security", { preHandler: fastify.authUser }, accountSecurity)
    fastify.get("/protected/account-settings", { preHandler: fastify.authUser }, accountSettings)
    fastify.get("/protected/account-wishlist", { preHandler: fastify.authUser }, accountWishlist)

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
