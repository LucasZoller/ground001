import { component$ } from "@builder.io/qwik"

export default component$(() => {
  return (
    <div class="flex justify-around ptb3 mtb5 font-8" style={{ "background-color": "var(--gray-900)" }}>
      <div class="ma">
        <a href="#">Best Videos</a>
      </div>
      <div class="ma">
        <a href="#">Hot Right Now</a>
      </div>
      <div class="ma">
        <a href="#">Channels</a>
      </div>
      <div class="ma">
        <a href="#">Tags</a>
      </div>
      <div class="ma">
        <a href="#">Actress</a>
      </div>
      <div class="ma">
        <a href="#">Features</a>
      </div>
    </div>
  )
})
