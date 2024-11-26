import { component$, useContext } from "@builder.io/qwik"
import { routeLoader$ } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"

import { IndexItems } from "../../../components/AccountPages/IndexItems"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"
import { fetchProtectedDataHelper } from "../../../helpers/fetch-helpers"
import { useBanIdlePrefetch } from "../../../hooks/useBanIdlePrefetch"
// Replace the following "obj" with the actual fetched data from postgres!!🐘🐘🐘🐘
// use routeLoader$
import { obj } from "./posgresData"

export const useProtectedItemsLoader = routeLoader$(async ({ cookie }) => {
  return fetchProtectedDataHelper(cookie, "/protected/account-items")
})

export default component$(() => {
  const { sessionState } = useContext(ContextIdGlobalState)
  const allowDisplay = useBanIdlePrefetch()
  const data = useProtectedItemsLoader()

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
      {data.value?.verified && allowDisplay ? <IndexItems cardObjArray={obj} /> : <div>Nothing to show</div>}
    </section>
  )
})
