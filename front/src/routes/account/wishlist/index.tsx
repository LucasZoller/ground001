import { component$ } from "@builder.io/qwik"
import { RequestEvent } from "@builder.io/qwik-city"

import { useAuth } from "../../../hooks/useAuth"

import { obj } from "./postgresData"
import { IndexWish } from "../../../components/AccountPages/IndexWish"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"

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

export const onGet = async ({ cookie, redirect }: RequestEvent) => {
  // redirect to login page if not logged in
  const isAuthrized = cookie.get("site-session")

  if (!isAuthrized?.value) {
    throw redirect(302, "/portal/signin")
  }
}

export default component$(() => {
  const { userState, sessionState } = useAuth()
  return (
    <section>
      <Breadcrumbs />
      {userState.user_code ? (
        <div>
          If wish list has items, navigate to page 1 of the wishlist or display
          nothing
        </div>
      ) : (
        <div>Nothing to show here</div>
      )}
    </section>
  )
})
