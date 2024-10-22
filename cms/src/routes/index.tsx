import { component$ } from "@builder.io/qwik"
import type { DocumentHead } from "@builder.io/qwik-city"

export default component$(() => {
  return (
    <>
      <h1>THE AKNM CMS</h1>
      <div>Everything starts from here.</div>
    </>
  )
})

export const head: DocumentHead = {
  title: "21749",
  meta: [
    {
      name: "description",
      content: "Qwik site description"
    }
  ]
}
