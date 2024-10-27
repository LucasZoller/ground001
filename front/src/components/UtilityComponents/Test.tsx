import { component$, useStore, useTask$ } from "@builder.io/qwik"
import { useLocation } from "@builder.io/qwik-city"

export const Test = component$(() => {
  const location = useLocation()
  const test = useStore({
    bool: false
  })

  useTask$(({ track }) => {
    track(() => location.params.page)
    test.bool = parseInt(location.params.page) === 4
  })
  return <div>{test.bool && <div>The Bool is now True</div>}</div>
})
