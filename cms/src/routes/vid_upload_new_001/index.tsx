import { $, component$, useSignal, useStore } from "@builder.io/qwik"
import wretch from "wretch"
import { BACKEND_URL } from "../../config"

type ImageFormat = "avif" | "jpeg"

export type CoverUrlObj = {
  mobile: Record<ImageFormat, string> // Record<K, V> creates an object type with keys of type K, and values of type V.
  desktop: Record<ImageFormat, string> // Record<ImageFormat, string> means, Both "avif" and "jpeg" must be provided as keys.
}

type ImgUrlObj = Record<ImageFormat, string[]>

export default component$(() => {
  const vidProp = useStore({
    product_number: "",
    published: false,
    title_ja: "",
    title_en: "",
    cover_url: { mobile: { avif: "", jpeg: "" }, desktop: { avif: "", jpeg: "" } },
    img_url: { avif: [""], jpeg: [""] },
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

  const addInput = $((format: "avif" | "jpeg") => {
    vidProp.img_url[format].push("")
  })

  const dbSubmit = $(async () => {
    try {
      await wretch(`${BACKEND_URL}/create_vid_001`).post({ vidProp }).json()
    } catch (err) {
      console.log(err)
    }
  })

  return (
    <div class="section-two-parts">
      <section class="section-left">
        <div class="section">
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
          <div>title en</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="Title in English"
            onInput$={e => (vidProp.title_en = (e.target as HTMLInputElement).value)}
          />
          <div>title ja</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="日本語タイトル"
            onInput$={e => (vidProp.title_ja = (e.target as HTMLInputElement).value)}
          />
        </div>
        <div class="section">
          <div>cover url </div>
          <label>
            desktop : AVIF
            <input
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="https://aknm.video/cover.jpg"
              onInput$={e => (vidProp.cover_url.desktop.avif = (e.target as HTMLInputElement).value)}
            />
          </label>
          <label>
            desktop : JPEG
            <input
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="https://aknm.video/cover.jpg"
              onInput$={e => (vidProp.cover_url.desktop.jpeg = (e.target as HTMLInputElement).value)}
            />
          </label>
          <label>
            mobile : AVIF
            <input
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="https://aknm.video/cover.jpg"
              onInput$={e => (vidProp.cover_url.mobile.avif = (e.target as HTMLInputElement).value)}
            />
          </label>
          <label>
            mobile : JPEG
            <input
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="https://aknm.video/cover.jpg"
              onInput$={e => (vidProp.cover_url.mobile.avif = (e.target as HTMLInputElement).value)}
            />
          </label>
        </div>
        <div class="section">
          <div>img url AVIF</div>
          {vidProp.img_url.avif.map((url, index) => (
            <div key={index}>
              <label class="flex gap5">
                <span class="mtba">{index + 1}</span>
                <input
                  class="inline-block p5 font8 w100 mtb5"
                  type="text"
                  placeholder="https://aknm.video/cover.avif"
                  onInput$={e => (vidProp.img_url.avif[index] = (e.target as HTMLInputElement).value)}
                />
              </label>
            </div>
          ))}

          <button type="button" onClick$={() => addInput("avif")}>
            +
          </button>
        </div>
        <div class="section">
          <div>img url JPEG</div>
          {vidProp.img_url.jpeg.map((url, index) => (
            <div key={index}>
              <label class="flex gap5">
                <span class="mtba">{index + 1}</span>
                <input
                  class="inline-block p5 font8 w100 mtb5"
                  type="text"
                  placeholder="https://aknm.video/cover.jpg"
                  onInput$={e => (vidProp.img_url.jpeg[index] = (e.target as HTMLInputElement).value)}
                />
              </label>
            </div>
          ))}

          <button type="button" onClick$={() => addInput("jpeg")}>
            +
          </button>
        </div>
        <div class="section">
          <div>txt en</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="Description in English"
            onInput$={e => (vidProp.txt_en = (e.target as HTMLInputElement).value)}
          />
          <div>txt ja</div>
          <input
            class="inline-block p5 font8 w100"
            type="text"
            placeholder="説明文　日本語"
            onInput$={e => (vidProp.txt_ja = (e.target as HTMLInputElement).value)}
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
        </div>

        <div onClick$={dbSubmit} class="mini-button-strawberry">
          Save
        </div>
      </section>
      <section class="section-right">kkk</section>
    </div>
  )
})
