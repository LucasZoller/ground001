import { component$, useStore, useTask$ } from "@builder.io/qwik"
import { routeLoader$, useLocation, useNavigate } from "@builder.io/qwik-city"

import { obj } from "../../postgresData"
import { IndexWish } from "../../../../../components/AccountPages/IndexWish"
import { Breadcrumbs } from "../../../../../components/UtilityComponents/Breadcrums"
import { Pagination } from "../../../../../components/UtilityComponents/Pagination"
import { fetchProtectedDataHelperWithParam } from "../../../../../helpers/fetch-helpers"
import { useBanIdlePrefetch } from "../../../../../hooks/useBanIdlePrefetch"

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

export const useProtectedWishlistPageLoader = routeLoader$(({ cookie, params }) => {
  return fetchProtectedDataHelperWithParam(cookie, "/protected/account-wishlist", params?.page)
})

export default component$(() => {
  const store = useStore({
    itemsPerPage: 5,
    isLastSlice: false,
    arrForThisPage: [] as WishItem[],
    totalPages: 0,
    currentPage: 0,
    startIndex: 0,
    endIndex: 0
  })

  const allowDisplay = useBanIdlePrefetch()
  const data = useProtectedWishlistPageLoader()
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
