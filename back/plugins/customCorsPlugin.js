import fp from "fastify-plugin"
import cors from "@fastify/cors"

export const customCorsPlugin = fp(async function (fastify, options) {
  console.log("🎏🎏🎏customCorsPlugin is running!")
  // You can use `options` or environment variables to decide configuration
  const customCorsOptions = {
    origin: ["http://localhost:43718", "http://localhost:19191"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  }
  fastify.register(cors, customCorsOptions)
})
