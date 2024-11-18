import { component$, useTask$, useVisibleTask$ } from "@builder.io/qwik"

export default component$(() => {
  useTask$(() => {
    console.log("🚜🚜🚜useTask$ 1 is running at route /test1/")
    if (true) return
    console.log("🚜🚜🚜Unreachable code at route /test1/")
  })
  useTask$(() => {
    console.log("🚜🚜🚜🚜🚜🚜useTask$ 2 is running at route /test1/")
    if (true) return
    console.log("🚜🚜🚜Unreachable code at route /test1/")
  })

  useVisibleTask$(() => {
    console.log("🚜🚜🚜useVisibleTask$ is running at route /test1/")
  })
  return <>test1</>
})
