import { component$, useContext } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"

import { IndexOrders } from "../../../components/AccountPages/IndexOrders"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"

import { obj } from "./postgresData"

import { useBanIdlePrefetch } from "~/hooks/useBanIdlePrefetch"
import { fetchProtectedDataHelper } from "~/helpers/fetch-helpers"

export const useProtectedOrdersLoader = routeLoader$(async ({ cookie }) => {
  return fetchProtectedDataHelper(cookie, "/protected/account-orders")
})

export default component$(() => {
  const { sessionState } = useContext(ContextIdGlobalState)

  const allowDisplay = useBanIdlePrefetch()
  const data = useProtectedOrdersLoader()

  return (
    <section>
      <div class="p5">
        <div>
          userCode : <span class="color-magenta">{data.value?.userCode}</span>
        </div>
        <div>
          userName : <span class="color-magenta">{sessionState.userName}</span>
        </div>
        <div>
          Language : <span class="color-magenta">{sessionState.lang}</span>
        </div>
        <div>
          Cart : <span class="color-magenta">{sessionState.cart && sessionState.cart.length > 0 ? sessionState.cart : "No item!"}</span>
        </div>
        <div>
          Route specific data : <span class="color-magenta">{data.value?.protected.message}</span>
        </div>
      </div>

      <Breadcrumbs />
      {data.value?.verified && allowDisplay ? <IndexOrders orderObjArr={obj} /> : <div>Not verified. Nothing to show</div>}
    </section>
  )
})
