export function cookieTest(req, res) {
  console.log("cookie test is triggered!")
  res
    .cookie("testing Cookie", "aslkjhlkjnlaskjdhkauhdkjlkjlkjbkjhbk", {
      httpOnly: true //Prevents access via JavaScript
    })
    .status(200)
    .json({ at: "anything" })
  console.log("cookie test has finished.✨")
}
