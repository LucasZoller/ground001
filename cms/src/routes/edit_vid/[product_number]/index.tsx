import { $, component$, useSignal, useStore, useTask$ } from "@builder.io/qwik"
import { routeLoader$, useLocation } from "@builder.io/qwik-city"
import wretch from "wretch"
import { BACKEND_URL } from "../../../config"
import { Video, dbSays } from "./../../types"

export const useReadVideos = routeLoader$(async requestEvent => {
  //This code runs only on the server, after every navigation
  //console.log will be printed in the server
  const code = requestEvent.params.product_number
  try {
    const data = await wretch(BACKEND_URL)
      .url(`/read_vid_by_productNumber?code=${code}`) // Use .url() to append query parameters
      .get()
      .json<Video[]>()
    return data
  } catch (errDB) {
    console.error("Failed to get data", errDB)
    return []
  }
})

export default component$(() => {
  const location = useLocation()
  const productNumber = location.params.product_number

  // useReadVideos will be triggered on the server-side with productNumber
  const nowData = useReadVideos()

  const vidProp = useStore({
    product_number: nowData.value[0].product_number || "",
    published: nowData.value[0].published || false,
    title_ja: nowData.value[0].title_ja || "",
    title_en: nowData.value[0].title_en || "",
    cover_url: nowData.value[0].cover_url || "",
    img_url: nowData.value[0].img_url || [""],
    txt_ja: nowData.value[0].txt_ja || "",
    txt_en: nowData.value[0].txt_en || "",
    duration_min: nowData.value[0].duration.minutes || "",
    duration_sec: nowData.value[0].duration.seconds || "",
    price: nowData.value[0].price || "",
    vid_url_240p: nowData.value[0].vid_url_240p || "",
    vid_url_480p: nowData.value[0].vid_url_480p || "",
    vid_url_720p: nowData.value[0].vid_url_720p || "",
    sample_url_240p: nowData.value[0].sample_url_240p || "",
    sample_url_480p: nowData.value[0].sample_url_480p || "",
    sample_url_720p: nowData.value[0].sample_url_720p || ""
  })

  const durationChecker = useSignal(true)
  const dbMessage = useSignal("")

  useTask$(({ track }) => {
    const min = track(() => vidProp.duration_min)
    const sec = track(() => vidProp.duration_sec)
    if ((min === "" && sec === "") || (min !== "" && sec !== "")) {
      durationChecker.value = true
    } else {
      durationChecker.value = false
    }
  })

  const addInput = $(() => {
    vidProp.img_url.push("")
  })

  const removeInput = $((index: number) => {
    vidProp.img_url.splice(index, 1)
  })

  const dbSubmit = $(async () => {
    if (durationChecker.value) {
      try {
        const db = await wretch(`${BACKEND_URL}/edit_vid_001`).post({ vidProp }).json<dbSays>()
        dbMessage.value = db.dbSays
        console.log(dbMessage.value)
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log("🧨You ignored the message and pressed submit:) Please don't do that:)")
    }
  })

  return (
    <>
      <div class="section-two-parts">
        <section class="section-left">
          <div class="section">
            <div>product code *Product code is readOnly and cannot be modified*</div>
            <input
              readOnly
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="aknm000"
              onInput$={e => (vidProp.product_number = (e.target as HTMLInputElement).value)}
              value={vidProp.product_number}
            />
            <div>published</div>
            <input class="inline-block p5" type="checkbox" onClick$={e => (vidProp.published = !vidProp.published)} checked={vidProp.published} />
          </div>

          <div class="section">
            <div>title ja</div>
            <input
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="日本語タイトル"
              onInput$={e => (vidProp.title_ja = (e.target as HTMLInputElement).value)}
              value={vidProp.title_ja}
            />
            <div>title en</div>
            <input
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="Title in English"
              onInput$={e => (vidProp.title_en = (e.target as HTMLInputElement).value)}
              value={vidProp.title_en}
            />
          </div>
          <div class="section">
            <div>cover url</div>
            <input
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="https://aknm.video/cover.jpg"
              onInput$={e => (vidProp.cover_url = (e.target as HTMLInputElement).value)}
              value={vidProp.cover_url}
            />
          </div>
          <div class="section">
            <div>img url</div>
            {vidProp.img_url.map((url, index) => (
              <div key={index} class="flex ptb3">
                <span class="mtba pr5">{index + 1} : </span>
                <input
                  class="inline-block p5 font8 flex-grow-1"
                  type="text"
                  placeholder="https://aknm.video/cover.jpg"
                  onInput$={e => (vidProp.img_url[index] = (e.target as HTMLInputElement).value)}
                  value={url}
                />
                <span class="mini-button-turquoise p5 mtba ml5" onClick$={() => removeInput(index)}>
                  remove
                </span>
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
              value={vidProp.txt_ja}
            />
            <div>txt en</div>
            <input
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="Description in English"
              onInput$={e => (vidProp.txt_en = (e.target as HTMLInputElement).value)}
              value={vidProp.txt_en}
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
              value={vidProp.duration_min}
            />{" "}
            min
            <input
              class="inline-block p5 font8"
              type="number"
              max="59"
              placeholder="59"
              onInput$={e => (vidProp.duration_sec = (e.target as HTMLInputElement).value)}
              value={vidProp.duration_sec}
            />{" "}
            sec
            <div>price</div>
            $
            <input
              class="inline-block p5 font8"
              type="text"
              placeholder="15.48"
              onInput$={e => (vidProp.price = (e.target as HTMLInputElement).value)}
              value={vidProp.price}
            />
          </div>

          <div class="section">
            <div>video 240p</div>
            <input
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="https://aknm.video/cover.jpg"
              onInput$={e => (vidProp.vid_url_240p = (e.target as HTMLInputElement).value)}
              value={vidProp.vid_url_240p}
            />
            <div>video 480p</div>
            <input
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="https://aknm.video/cover.jpg"
              onInput$={e => (vidProp.vid_url_480p = (e.target as HTMLInputElement).value)}
              value={vidProp.vid_url_480p}
            />
            <div>video 720p</div>
            <input
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="https://aknm.video/cover.jpg"
              onInput$={e => (vidProp.vid_url_720p = (e.target as HTMLInputElement).value)}
              value={vidProp.vid_url_720p}
            />
          </div>

          <div class="section">
            <div>sample 240p</div>
            <input
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="https://aknm.sample/cover.jpg"
              onInput$={e => (vidProp.sample_url_240p = (e.target as HTMLInputElement).value)}
              value={vidProp.sample_url_240p}
            />
            <div>sample 480p</div>
            <input
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="https://aknm.sample/cover.jpg"
              onInput$={e => (vidProp.sample_url_480p = (e.target as HTMLInputElement).value)}
              value={vidProp.sample_url_480p}
            />
            <div>sample 720p</div>
            <input
              class="inline-block p5 font8 w100"
              type="text"
              placeholder="https://aknm.sample/cover.jpg"
              onInput$={e => (vidProp.sample_url_720p = (e.target as HTMLInputElement).value)}
              value={vidProp.sample_url_720p}
            />
          </div>
          <div>{!durationChecker.value && `🧨Duration field must either both be filled or bothe be empty🧨`}</div>
          <div onClick$={dbSubmit} class="mini-button-dolphin ma w100px">
            Save
          </div>
          {dbMessage.value !== "" && <div>{dbMessage.value}</div>}
        </section>
      </div>
    </>
  )
})
