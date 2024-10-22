import { component$, useSignal, useTask$ } from "@builder.io/qwik"
import wretch from "wretch"
import { BACKEND_URL } from "../../config"
import { routeLoader$ } from "@builder.io/qwik-city"
import { Video } from "./../types"

export const useReadVideos = routeLoader$(async () => {
  //This code runs only on the server, after every navigation
  //console.log will be printed in the server
  try {
    const readVideos = await wretch(`${BACKEND_URL}/read_vid_001`).get().json<Video[]>()
    return readVideos
  } catch (errDB) {
    console.error("Failed to get data", errDB)
    return []
  }
})

export const searchVideos = async (term: string) => {
  try {
    const data = await wretch(`${BACKEND_URL}/search_vid_001`).post({ searchTerm: term }).json<Video[]>()
    return data
  } catch (errDB) {
    console.error("Failed to get data", errDB)
    return []
  }
}

export default component$(() => {
  const videosData = useSignal<Video[]>([])
  const initialData = useReadVideos()
  const searchTerm = useSignal("")

  useTask$(({ track }) => {
    const data = track(() => initialData.value)
    if (data) {
      videosData.value = data
    }
  })

  return (
    <>
      <div class="flex w100 p5 justify-around">
        <div class="flex gap5">
          <div class="mini-button-autumn flex">
            <span class="ma">Most Recent</span>
          </div>
          <div class="mini-button-autumn flex">
            <span class="ma">Oldest</span>
          </div>
          <div class="mini-button-strawberry flex">
            <span class="ma">Highest Sales</span>
          </div>
          <div class="mini-button-strawberry flex">
            <span class="ma">Lowest Sales</span>
          </div>
          <div class="mini-button-orange flex">
            <span class="ma">10</span>
          </div>
          <div class="mini-button-orange flex">
            <span class="ma">20</span>
          </div>
          <div class="mini-button-orange flex">
            <span class="ma">30</span>
          </div>
          <div class="mini-button-orange flex">
            <span class="ma">40</span>
          </div>
          <div class="mini-button-orange flex">
            <span class="ma">50</span>
          </div>
          <div class="mini-button-orange flex">
            <span class="ma">75</span>
          </div>
          <div class="mini-button-orange flex">
            <span class="ma">100</span>
          </div>
          <div class="mini-button-grape flex">
            <span class="ma">has actress</span>
          </div>
          <div class="mini-button-dolphin flex">
            <span class="ma">is published</span>
          </div>
        </div>
        <div class="flex gap5 w30">
          <input
            class="flex-grow-1 flex-shrink-1 p5"
            placeholder="product no or part of the title"
            onInput$={async e => {
              searchTerm.value = (e.target as HTMLInputElement).value
              console.log(searchTerm.value)
            }}
          />
          <div class="mini-button-turquoise flex">
            <span
              class="ma"
              onClick$={async () => {
                videosData.value = await searchVideos(searchTerm.value)
                console.log("Search is pressed")
              }}
            >
              search
            </span>
          </div>
        </div>
      </div>

      <section class="section-full">
        {videosData.value.length > 0 && (
          <>
            <div class="grid grid-template-8 border-bottom-turquoise">
              <div class="ma p5">product no</div>
              <div class="ma p5">created at</div>
              <div class="ma p5">title</div>
              <div class="ma p5">duration</div>
              <div class="ma p5">price</div>
              <div class="ma p5">published</div>
              <div class="ma p5">view</div>
              <div class="ma p5">edit</div>
            </div>
            {videosData.value.map(v => (
              <div class="grid grid-template-8 border-bottom font8" key={v.product_number}>
                <div class="ma p5">{v.product_number}</div>
                <div class="ma p5">{v.created_at.split("T")[0]}</div>
                <div class="ma p5">{v.title_ja}</div>
                <div class="ma p5">
                  {v.duration.minutes}:{v.duration.seconds}
                </div>
                <div class="ma p5">$ {v.price}</div>
                <div class="ma p5">{v.published ? `out` : `draft`}</div>
                <div class="ma p5">
                  <a href="/" class="mini-button-orange">
                    View
                  </a>
                </div>
                <div class="ma p5">
                  <a href={`/edit_vid/${v.product_number}`} class="mini-button-turquoise">
                    Go
                  </a>
                </div>
              </div>
            ))}
          </>
        )}
      </section>
    </>
  )
})
