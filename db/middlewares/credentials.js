export function credentials(req, res, next) {
  const allowedOrigin = ["http://localhost:43718", "http://localhost:19191"]
  //port 19191 is cms.
  //port 43718 is frontend.
  if (allowedOrigin.includes(req.headers.origin)) {
    res
      .setHeader("Access-Control-Allow-Origin", req.headers.origin)
      .setHeader("Access-Control-Allow-Credentials", true)
      .setHeader("Access-Control-Allow-Headers", "Content-Type, authorization") // Include other headers if needed
      .setHeader("Access-Control-Allow-Methods", "OPTIONS") // Add allowed methods, including OPTIONS
    // Include other headers if needed
  }

  next()
}
