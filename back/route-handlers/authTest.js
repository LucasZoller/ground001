export const authTest = async (request, reply) => {
  const secret = request.headers["authorization"]
  console.log("Do we have headers? : ", secret)
  console.log("this is the entire headers : ", request.headers)
  const message = "Fastify could read your header and verified it!🍓"
  const message2 = "Fastify doesn't know what to do🥑"
  if (secret === "Bearer hoo!") return { message }

  return { message2 }
}
