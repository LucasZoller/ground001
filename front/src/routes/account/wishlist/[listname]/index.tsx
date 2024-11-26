import { component$, useStore, useTask$ } from "@builder.io/qwik"
import { routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city"

import { fetchProtectedDataHelper } from "../../../../helpers/fetch-helpers"
import { useBanIdlePrefetch } from "../../../../hooks/useBanIdlePrefetch"
import { obj } from "../postgresData"

import { Breadcrumbs } from "../../../../components/UtilityComponents/Breadcrums"
import { IndexWish } from "../../../../components/AccountPages/IndexWish"
import { Pagination } from "../../../../components/UtilityComponents/Pagination"

import type { WishItem } from "../postgresData"
// CASE 2-1, 2-2 : Can't reach here without AT.
export const useProtectedWishlistNameLoader = routeLoader$(async ({ cookie, redirect, params }) => {
  return fetchProtectedDataHelper(cookie, "/protected/account-wishlist")
})

export default component$(() => {
  const allowDisplay = useBanIdlePrefetch()
  const data = useProtectedWishlistNameLoader()
  const store = useStore({
    itemsPerPage: 10,
    isLastSlice: false,
    arrForThisPage: [] as WishItem[],
    totalPages: 0,
    currentPage: 0,
    startIndex: 0,
    endIndex: 0
  })

  const location = useLocation()
  const nav = useNavigate()

  useTask$(({ track }) => {
    track(() => location.params.page)
    store.totalPages = Math.ceil(obj.length / store.itemsPerPage)
    store.currentPage = parseInt(location.params.page)
    store.isLastSlice = store.currentPage === store.totalPages

    store.startIndex = (store.currentPage - 1) * store.itemsPerPage
    store.endIndex = store.startIndex + store.itemsPerPage

    store.arrForThisPage = obj.slice(store.startIndex, store.endIndex)
  })

  return (
    <section>
      <Breadcrumbs />
      //Conditionally show appropriate component.
      {true ? <IndexWish wishItemObjArr={store.arrForThisPage} isLastSlice={store.isLastSlice} /> : <div>Nothing to show here</div>}
      <div class="mtb20">
        <Pagination totalPages={store.totalPages} />
      </div>
    </section>
  )
})
