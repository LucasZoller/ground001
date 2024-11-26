import { component$, useStore, useTask$ } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"

import { IndexWish } from "../../../components/AccountPages/IndexWish"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"
import { Pagination } from "../../../components/UtilityComponents/Pagination"

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

export const useProtectedWishlistLoader = routeLoader$(async ({ cookie }) => {
  return fetchProtectedDataHelper(cookie, "/protected/account-wishlist")
})

export default component$(() => {
  const allowDisplay = useBanIdlePrefetch()
  const data = useProtectedWishlistLoader()

  const store = useStore({
    itemsPerPage: 10,
    isLastSlice: false,
    arrForThisPage: [] as WishItem[],
    totalPages: 0,
    currentPage: 0,
    startIndex: 0,
    endIndex: 0
  })

  useTask$(({ track }) => {
    store.totalPages = Math.ceil(obj.length / store.itemsPerPage)
    store.currentPage = 1
    store.isLastSlice = store.currentPage === store.totalPages

    store.startIndex = (store.currentPage - 1) * store.itemsPerPage
    store.endIndex = store.startIndex + store.itemsPerPage

    store.arrForThisPage = obj.slice(store.startIndex, store.endIndex)
  })

  return (
    <section>
      <Breadcrumbs />

      {true ? <IndexWish wishItemObjArr={store.arrForThisPage} isLastSlice={store.isLastSlice} /> : <div>Nothing to show here</div>}
      <div class="mtb20">
        <Pagination totalPages={store.totalPages} />
      </div>

      <div></div>
    </section>
  )
})
