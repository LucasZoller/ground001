import {
  component$,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik"
import { useLocation, useNavigate } from "@builder.io/qwik-city"

import { useAuth } from "../../../../hooks/useAuth"
import { obj } from "../postgresData"
import { IndexWish } from "../../../../components/AccountPages/IndexWish"
import { Breadcrumbs } from "../../../../components/UtilityComponents/Breadcrums"
import { Pagination } from "../../../../components/UtilityComponents/Pagination"

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

export default component$(() => {
  const { userState, sessionState } = useAuth()

  const store = useStore({
    itemsPerPage: 5,
    isLastSlice: false,
    arrForThisPage: [] as WishItem[],
    totalPages: 0,
    currentPage: 0,
    startIndex: 0,
    endIndex: 0,
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

      {userState.user_code ? (
        <IndexWish
          wishItemObjArr={store.arrForThisPage}
          isLastSlice={store.isLastSlice}
        />
      ) : (
        <div>Nothing to show here</div>
      )}
      <div class="mtb20">
        <Pagination totalPages={store.totalPages} />
      </div>
    </section>
  )
})
