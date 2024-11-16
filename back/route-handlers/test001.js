import paseto from "paseto"
export const test001 = async (request, reply) => {
  const clientRt = request.headers["authorization"]
  console.log(
    "🌷🌷🌷/test/ is looking at the headers[authorization] : ",
    clientRt
  )
  const val = "I came from /test/ from Fastify backend!"
  // let testme
  // try {
  //   testme = "🎊🎊🎊hello my friend!"
  //   console.log("🎐🎐🎐let's go")
  //   console.log(testme)
  // } catch (err) {
  //   console.log("ouch!!!")
  // } finally {
  //   testme = "🎊🎊🎊good-bye my friend!"
  //   console.log("🎐🎐🎐Finally : ")
  //   console.log(testme)
  //   const { V4 } = paseto
  //   const pasetoKey = await V4.generateKey("public", { format: "paserk" })
  //   console.log(pasetoKey)
  // }
  return { val, clientRt }
}
