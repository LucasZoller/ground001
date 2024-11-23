import { component$ } from "@builder.io/qwik"

export default component$(() => {
  console.log("🎏🎏🎏Hey from protected-test index!")
  let message = "I am the default one🧵🧵🧵"

  return (
    <>
      <div>test</div>
    </>
  )
})
