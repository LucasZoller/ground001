import { component$, useSignal } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"

import { IndexWish } from "../../../components/AccountPages/IndexWish"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"

import { fetchProtectedDataHelper } from "../../../helpers/fetch-helpers"
import { useBanIdlePrefetch } from "../../../hooks/useBanIdlePrefetch"
import { obj } from "./postgresData"

type WishItem = {
  itemAddedOn: string
  productId: string
  productTitle: string
  productPrice: string
  thumbSetObject: {
    avif: string[]
    jpeg: string[]
  }
}
type WishIndexObj = {
  wishItemObjArr: WishItem[]
  isLastSlice: boolean
}

// CASE 2-1, 2-2 : Can't reach here without AT.
export const useProtectedDataLoader = routeLoader$(async ({ cookie }) => {
  return fetchProtectedDataHelper(cookie, "/protected/account-wishlist")
})

export default component$(() => {
  const allowDisplay = useBanIdlePrefetch()
  const data = useProtectedDataLoader()

  console.log("wishlist index.tsx useProtectedDataLoader returned this : ", data.value)

  return (
    <section>
      <Breadcrumbs />
      {data.value?.verified && allowDisplay ? (
        <div>
          <div>User code : {data.value?.userCode}</div>
          <div>User code : {data.value?.protected.message}</div>
          <div class="flex">
            <div class="grid" style={{ maxWidth: "220px" }}>
              <div class="box-cadetblue" style={{ textAlign: "center" }}>
                My wishlist
              </div>
              <div class="box-cadetblue" style={{ textAlign: "center" }}>
                My second wishlist
              </div>
              <div class="box-cadetblue" style={{ textAlign: "center" }}>
                My third wishlist
              </div>
              <div class="mini-button-magenta mtba">Add another wishlist +</div>
            </div>
            <div style={{ width: "700px" }}>
              <h3>My wishlist</h3>
              <div>
                <ul>
                  <li>Item 1 from List A</li>
                  <li>Item 2 from List A</li>
                  <li>Item 3 from List A</li>
                  <li>Item 4 from List A</li>
                  <li>Item 5 from List A</li>
                </ul>

                <div>Show pagination</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Nothing to show here</div>
      )}
    </section>
  )
})
