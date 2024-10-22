import { $, component$, useStore, useTask$ } from "@builder.io/qwik"

export default component$(() => {
  const state = useStore({ one: "initial state" })

  useTask$(({ track }) => {
    track(() => state.one)
    setTimeout(
      $(() => {
        state.one = "second"
        console.log(state.one)
      }),
      2000
    )
  })

  return <>{state.one}</>
})
