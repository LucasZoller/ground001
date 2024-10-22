import { component$, useStylesScoped$ } from "@builder.io/qwik"

export const Header = component$(() => {
  return (
    <>
      <div class="header">
        <h2 class="logo">The AKNM cms</h2>
        <ul>
          <li class="inline-block prl5">
            <a href="/vid_upload_new_001/">+Upload</a>
          </li>
          <li class="inline-block prl5">
            <a href="/list_vid_001/">ListVideos</a>
          </li>
          <li class="inline-block prl5">
            <a href="/list_users_001">ListUsers</a>
          </li>
          <li class="inline-block prl5">
            <a href="/books_sub_properties_author">blank</a>
          </li>
          <li class="inline-block prl5">
            <a href="/books_sub_properties_circle">blank</a>
          </li>
          <li class="inline-block prl5">
            <a href="/books_sub_properties_original">blank</a>
          </li>
          <li class="inline-block prl5">
            <a href="/books_sub_properties_persona">blank</a>
          </li>
          <li class="inline-block prl5">
            <a href="/books_sub_properties_episode">blank</a>
          </li>
          <li class="inline-block prl5">
            <a href="/x-original-persona">blank</a>
          </li>
          <li class="inline-block prl5">
            <a href="/x-circle-author">blank</a>
          </li>
        </ul>
      </div>
    </>
  )
})
