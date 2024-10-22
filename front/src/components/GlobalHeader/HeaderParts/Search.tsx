import { component$ } from "@builder.io/qwik"

export default component$(() => {
  return (
    <>
      <div class="rps-header-search-box flex flex-grow-1 ma">
        <div class="w60 flex ma">
          <input placeholder="Search within AKNM" class="w100" />
          <div class="ml5 mini-button-magenta">Search</div>
        </div>
      </div>
    </>
  )
})
