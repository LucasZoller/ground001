import { component$, useContext } from "@builder.io/qwik"
import {
  Link,
  routeLoader$,
  useNavigate,
  type DocumentHead,
} from "@builder.io/qwik-city"
import wretch from "wretch"
import { BACK_URL } from "../config"
import type { Video } from "../types"

import { obj } from "./postgresData"

import { ContextIdGlobalState } from "../context/ContextGlobalState"

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

export default component$(() => {
  const dbVids = useReadVid()
  const navigate = useNavigate()
  const { sessionState } = useContext(ContextIdGlobalState)
  return (
    // sidebar
    <div class="w100 flex">
      <div
        class="grid gap10"
        style={{
          width: "240px",
          backgroundColor: "var(--gray-500)",
          boxShadow: "0 0 8px var(--gray-700)",
        }}>
        <div>
          <div>
            {sessionState.userName ? sessionState.userName : "no name found"}
          </div>
          <div>{sessionState.lang ? sessionState.lang : "nothing"}</div>
        </div>
        <Link href="/test/">Go to test</Link>
        <div class="bg-gray-100">some sidebar thingy</div>
        <div class="bg-gray-100">some sidebar thingy</div>
        <div class="bg-gray-100">some sidebar thingy</div>
        <div class="bg-gray-100">some sidebar thingy</div>
        <div class="bg-gray-100">some sidebar thingy</div>
        <div class="bg-gray-100">some sidebar thingy</div>
        <div class="bg-gray-100">some sidebar thingy</div>
      </div>

      {/* main cards area */}
      <div
        class="grid gap10 mrla"
        style={{
          gridTemplateColumns: "1fr 1fr 1fr",
          maxWidth: "1080px",
          justifyContent: "",
        }}>
        {obj.map((singleVideoObj) => (
          <div
            class="w100 bg-gray-900 radius15 grid"
            style={{
              minWidth: "280px",
              overflow: "hidden",
              gridTemplateRows: "auto 1fr",
            }}
            key={singleVideoObj.productId}>
            <picture class="inline-block mtba" style={{ alignSelf: "start" }}>
              <source
                srcset={singleVideoObj.thumbSetObject.avif[0]}
                type="image/avif"
              />
              <source
                srcset={singleVideoObj.thumbSetObject.jpeg[0]}
                type="image/jpeg"
              />

              <img
                width="320"
                height="180"
                style={{ maxWidth: "100%", height: "auto" }}
                src={singleVideoObj.thumbSetObject.jpeg[1]}
                alt="small thumbnail for order page"
              />
            </picture>
            <div
              class="p5 grid gap2"
              style={{
                gridTemplateRows: "auto auto auto",
                alignSelf: "stretch",
              }}>
              <div class="font-8" style={{ alignSelf: "start" }}>
                {singleVideoObj.productId}
              </div>
              <div class="font-9 color-magenta">
                {singleVideoObj.productTitle}
              </div>
              <div
                class="flex prl5 pb4"
                style={{ alignSelf: "end", justifyContent: "space-between" }}>
                <div class="mtba">${singleVideoObj.productPrice}</div>
                <div class="mini-button-orange ptb5 prl10">Add to Cart</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

export const head: DocumentHead = {
  title: "Voyeur Videos & Hidden Cam Porn - AKNM",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
}
