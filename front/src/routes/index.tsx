import { component$ } from "@builder.io/qwik"
import { Link, routeLoader$, useNavigate, type DocumentHead } from "@builder.io/qwik-city"
import wretch from "wretch"
import { BACK_URL } from "../config"
import { Video, TestFastify } from "~/types"

export const useReadVid = routeLoader$(async () => {
  //This code runs only on the server, after every navigation
  //console.log will be printed in the server
  try {
    const db = await wretch(`${BACK_URL}/read_vid_001`).get().json<Video[]>()
    return db
  } catch (errDB) {
    return []
    console.error(errDB, "Couldn't fetch data.")
  }
})

export const useTestFastify = routeLoader$(async () => {
  try {
    const data = await wretch(`${BACK_URL}/test`).get().json<TestFastify>()
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
})

export default component$(() => {
  const dbVids = useReadVid()
  const navigate = useNavigate()
  const message = useTestFastify()

  return (
    <>
      <div>
        {dbVids.value.length > 0 ? (
          <div class="grid grid-template-4">
            {dbVids.value.map(v => (
              <div key={v.product_number}>{v.title_ja}</div>
            ))}
          </div>
        ) : (
          <div>Nothing to display</div>
        )}
        <div>{message.value?.message}</div>

        <div class="mini-button-magenta w300px m5">
          <Link href="/protected-test">Go to /protected-test</Link>
        </div>
        <div class="">
          <Link href="/account/information">account information</Link>
        </div>
        <div class="mini-button-dolphin w300px m5">
          <Link href="/account">account</Link>
        </div>
      </div>
    </>
  )
})

export const head: DocumentHead = {
  title: "Voyeur Videos & Hidden Cam Porn - AKNM",
  meta: [
    {
      name: "description",
      content: "Qwik site description"
    }
  ]
}
