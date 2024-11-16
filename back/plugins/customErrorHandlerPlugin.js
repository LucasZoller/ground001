import fp from "fastify-plugin"

export const customErrorHandlerPlugin = fp(async (fastify) => {
  fastify.setErrorHandler((error, request, reply) => {
    switch (error.message) {
      case "ERR_FORM_NOT_FILLED":
        reply.status(400).send({ code: "ERR_FORM_NOT_FILLED", message: "" })
        break
      case "ERR_EMAIL_EXISTS":
        reply.status(400).send({ code: "ERR_EMAIL_EXISTS", message: "" })
        break
      case "ERR_USER_NOT_FOUND":
        reply.status(400).send({ code: "ERR_USER_NOT_FOUND", message: "" })
        break
      case "ERR_SUSPENDED":
        reply.status(400).send({ code: "ERR_SUSPENDED", message: "" })
        break
      case "ERR_HASHING_FAILED":
        reply.status(400).send({ code: "ERR_HASHING_FAILED", message: "" })
        break
      case "ERR_TOKEN_GENERATION_FAILED":
        reply
          .status(400)
          .send({ code: "ERR_TOKEN_GENERATION_FAILED", message: "" })
        break
      case "ERR_WRONG_PASSWORD":
        reply.status(400).send({ code: "ERR_WRONG_PASSWORD", message: "" })
        break
      case "ERR_NO_HEADERS":
        reply.status(400).send({ code: "ERR_NO_HEADERS", message: "" })
        break
      case "ERR_INVALID_HEADER":
        reply.status(400).send({ code: "ERR_INVALID_HEADER", message: "" })
        break
      case "ERR_AT_EXPIRED":
        reply.status(400).send({ code: "ERR_AT_EXPIRED", message: "" })
        break
      case "ERR_INVALID_AT":
        reply.status(400).send({ code: "ERR_INVALID_AT", message: "" })
        break

      case "ERR_NO_RT_IN_COOKIES":
        reply.status(400).send({ code: "ERR_NO_RT", message: "" })
        break
      case "ERR_RT_EXPIRED":
        console.log("🎊🎉🎊Successfully seen the expired RT!!!")
        reply.status(400).send({ code: "ERR_RT_EXPIRED", message: "" })
        break
      case "ERR_RT_NOT_MATCHING":
        console.log("ClientRT is not matching with the RT in the DB...")
        reply.status(400).send({ code: "ERR_RT_NOT_MATCHING", message: "" })
        break
      case "ERR_INVALID_RT":
        reply.status(400).send({ code: "ERR_INVALID_RT", message: "" })
        break

      default:
        console.log("🧨🧨🧨", error.message)
        reply.status(500).send({ code: "ERR_GENERAL", message: "" })
    }
    // Log the error
    console.error("🧨🧨🧨Custom Error Handler:", error)
  })
})
