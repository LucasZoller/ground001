import { component$, useContext, useTask$, useVisibleTask$ } from "@builder.io/qwik"
import { Link, RequestEvent } from "@builder.io/qwik-city"
import { useAuth } from "../../../hooks/useAuth"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"
import { modalCodes } from "../../../config"
import ImgAknm024Thumb260px from "../../../../public/images/aknm024-thumb-260px.jpg?jsx"
import { routeLoader$ } from "@builder.io/qwik-city"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"

export const useProtectedRoute = routeLoader$(async ({ cookie }) => {
  const coo = cookie.get("cltoken")
  const poo = cookie.get("site-session")
  console.log("coo is : ", coo)
  console.log("poo is : ", poo)
})

export const onGet = async ({ cookie, redirect }: RequestEvent) => {
  // redirect to login page if not logged in
  const isAuthrized = cookie.get("site-session")

  if (!isAuthrized?.value) {
    throw redirect(302, "/portal/signin")
  }
}

export default component$(() => {
  const { modalState } = useContext(ContextIdGlobalState)
  const { userState } = useAuth("/user-area-test")
  const po = useProtectedRoute()

  const obj = [
    {
      purchasedDate: "October 4, 2024",
      totalPrice: "91.50",
      orderId: "112-8845614-3671408",
      items: [
        {
          productId: "aknm024",
          productTitle: "Emo, Angst, and Sexxxx",
          productPrice: "20.58",
          expiryDate: "January 5, 2025",
          streamingPath: "/some-streaming-path",
          downloadPath: "/come-download-path",
          thumbSetObject: {
            avif: [
              "https://i.postimg.cc/MGT9GQ5m/aknm024-thumb-320.avif",
              "https://i.postimg.cc/Tw5QVvZy/aknm024-thumb-480.avif",
              "https://i.postimg.cc/PJm47zfT/aknm024-thumb-768.avif"
            ],
            jpeg: [
              "https://i.postimg.cc/QMy0KdnG/aknm024-thumb-320.jpg",
              "https://i.postimg.cc/d3M6nSY5/aknm024-thumb-480.jpg",
              "https://i.postimg.cc/T2mChGVF/aknm024-thumb-768.jpg"
            ]
          }
        }
      ]
    }
  ]
  return (
    <section>
      <Breadcrumbs />
      {!modalState.showModal && (
        <div class="grid">
          <div class="ma w100" style={{ maxWidth: "1000px" }}>
            <h2 class="font-weight-600 font-11 ptb5">Your Orders</h2>
            <div class="radius5 bg-gray-900" style={{ overflow: "hidden" }}>
              <div class="bg-gray-1000 p8">
                <div class="w20 inline-block">
                  <div class="font-7">ORDER PLACED</div>
                  <div class="font-9">{obj[0].purchasedDate}</div>
                </div>
                <div class="w20 inline-block">
                  <div class="font-7">TOTAL</div>
                  <div class="font-9">${obj[0].totalPrice}</div>
                </div>
                <div class="w60 inline-block text-align-right">
                  <div class="font-7">ORDER # </div>
                  <div class="font-9">{obj[0].orderId}</div>
                </div>
              </div>
              <div class="p8">
                <div class="flex">
                  <div class="inline-block w20">
                    <ImgAknm024Thumb260px class="w100 ha" />
                  </div>
                  <div class="w60 ml15 grid">
                    <div class="mtba">
                      <div class="font-8">{obj[0].items[0].productId}</div>
                      <div class="font-12 color-magenta">Emo, Angst, and Sex</div>
                    </div>
                    <div class="font-8">${obj[0].items[0].productPrice}</div>

                    <div class="font-8 mtba">
                      Available until : <span class="color-success">{obj[0].items[0].expiryDate}</span>
                    </div>
                  </div>
                  <div class="w20 mtba grid gap10" style={{ justifyContent: "flex-end" }}>
                    <Link href={obj[0].items[0].streamingPath} class="mini-button-dolphin w150px">
                      Play
                    </Link>
                    <Link href={obj[0].items[0].downloadPath} class="mini-button-magenta w150px">
                      Download
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
})
