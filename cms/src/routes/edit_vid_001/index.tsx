import { $, component$, useStore } from "@builder.io/qwik"
import wretch from "wretch"
import { BACKEND_URL } from "../../config"
import { routeLoader$ } from "@builder.io/qwik-city"
import { Video } from "./../types"

export default component$(() => {
  const vidProp = useStore({
    product_number: "",
    published: false,
    title_ja: "",
    title_en: "",
    cover_url: "",
    img_url: [""],
    txt_ja: "",
    txt_en: "",
    duration_min: "",
    duration_sec: "",
    price: "",
    vid_url_240p: "",
    vid_url_480p: "",
    vid_url_720p: "",
    sample_url_240p: "",
    sample_url_480p: "",
    sample_url_720p: ""
  })

  const addInput = $(() => {
    vidProp.img_url.push("")
  })

  const dbSubmit = $(async () => {
    try {
      console.log("pressed")
      await wretch(`${BACKEND_URL}/edit_vid_001`).post({ vidProp }).json()
    } catch (err) {
      console.log("error block")
      console.log(err)
    }
  })

  return (
    <>
      <section class="section-left">
        {/* <div class="section">
          <div>product code</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="AKNM001"
            onInput$={e => (vidProp.product_number = (e.target as HTMLInputElement).value)}
          />
          <div>published</div>
          <input class="inline-block p5" type="checkbox" onClick$={e => (vidProp.published = !vidProp.published)} />
        </div>

        <div class="section">
          <div>title ja</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="日本語タイトル"
            onInput$={e => (vidProp.title_ja = (e.target as HTMLInputElement).value)}
          />
          <div>title en</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="Title in English"
            onInput$={e => (vidProp.title_en = (e.target as HTMLInputElement).value)}
          />
        </div>
        <div class="section">
          <div>cover url</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="https://aknm.video/cover.jpg"
            onInput$={e => (vidProp.cover_url = (e.target as HTMLInputElement).value)}
          />
        </div>
        <div class="section">
          <div>img url</div>
          {vidProp.img_url.map((url, index) => (
            <div key={index}>
              <input
                class="inline-block p5 font8 w100"
                type="text"
                placeholder="https://aknm.video/cover.jpg"
                onInput$={e => (vidProp.img_url[index] = (e.target as HTMLInputElement).value)}
              />
            </div>
          ))}

          <button type="button" onClick$={addInput}>
            +
          </button>
        </div>
        <div class="section">
          <div>txt ja</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="説明文　日本語"
            onInput$={e => (vidProp.txt_ja = (e.target as HTMLInputElement).value)}
          />
          <div>txt en</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="Description in English"
            onInput$={e => (vidProp.txt_en = (e.target as HTMLInputElement).value)}
          />
        </div>
        <div class="section">
          <div>duration</div>
          <input
            class="inline-block p5 font8"
            type="number"
            max="59"
            placeholder="20"
            onInput$={e => (vidProp.duration_min = (e.target as HTMLInputElement).value)}
          />{" "}
          min
          <input
            class="inline-block p5 font8"
            type="number"
            max="59"
            placeholder="59"
            onInput$={e => (vidProp.duration_sec = (e.target as HTMLInputElement).value)}
          />{" "}
          sec
          <div>price</div>
          $<input class="inline-block p5 font8" type="text" placeholder="15.48" onInput$={e => (vidProp.price = (e.target as HTMLInputElement).value)} />
        </div>

        <div class="section">
          <div>video 240p</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="https://aknm.video/cover.jpg"
            onInput$={e => (vidProp.vid_url_240p = (e.target as HTMLInputElement).value)}
          />
          <div>video 480p</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="https://aknm.video/cover.jpg"
            onInput$={e => (vidProp.vid_url_480p = (e.target as HTMLInputElement).value)}
          />
          <div>video 720p</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="https://aknm.video/cover.jpg"
            onInput$={e => (vidProp.vid_url_720p = (e.target as HTMLInputElement).value)}
          />
        </div>

        <div class="section">
          <div>sample 240p</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="https://aknm.sample/cover.jpg"
            onInput$={e => (vidProp.sample_url_240p = (e.target as HTMLInputElement).value)}
          />
          <div>sample 480p</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="https://aknm.sample/cover.jpg"
            onInput$={e => (vidProp.sample_url_480p = (e.target as HTMLInputElement).value)}
          />
          <div>sample 720p</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="https://aknm.sample/cover.jpg"
            onInput$={e => (vidProp.sample_url_720p = (e.target as HTMLInputElement).value)}
          />
        </div> */}

        <div onClick$={dbSubmit}>Save</div>
      </section>
      <section class="section-right">kkk</section>
    </>
  )
})
