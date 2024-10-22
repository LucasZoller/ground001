import paseto from "paseto"
export const test001 = async (request, reply) => {
  const message = "🎈Hello, hello from my first Fastify server!🎉🎉🎉"
  let testme
  try {
    testme = "🎊🎊🎊hello my friend!"
    console.log("🎐🎐🎐let's go")
    console.log(testme)
  } catch (err) {
    console.log("ouch!!!")
  } finally {
    testme = "🎊🎊🎊good-bye my friend!"
    console.log("🎐🎐🎐Finally : ")
    console.log(testme)
    const { V4 } = paseto
    const pasetoKey = await V4.generateKey("public", { format: "paserk" })
    console.log(pasetoKey)
  }
  return { message }
}
