import { component$, useContext, useSignal } from "@builder.io/qwik"

import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"
import { ContextIdGlobalState } from "~/context/ContextGlobalState"
import { useBanIdlePrefetch } from "~/hooks/useBanIdlePrefetch"
import { routeLoader$ } from "@builder.io/qwik-city"
import { fetchProtectedDataHelper } from "~/helpers/fetch-helpers"

export const useProtectedDataLoader = routeLoader$(async ({ cookie }) => {
  return fetchProtectedDataHelper(cookie, "/protected/account-security")
})
export default component$(() => {
  const { sessionState } = useContext(ContextIdGlobalState)

  const allowDisplay = useBanIdlePrefetch()
  const data = useProtectedDataLoader()
  return (
    <>
      <Breadcrumbs />
      <div>
        <h2>You can change your account password here!</h2>
        <div>
          <div>
            <div>
              <span>Email : </span>
            </div>
            <div>To change your password, enter the current password</div>
            <div>
              <input placeholder="your current password" />
            </div>
            <div class="mini-button-magenta w300px">Submit</div>
          </div>
        </div>
      </div>
    </>
  )
})
