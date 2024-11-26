import { component$, useContext } from "@builder.io/qwik"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"
import { ContextIdGlobalState } from "~/context/ContextGlobalState"
import { useBanIdlePrefetch } from "~/hooks/useBanIdlePrefetch"
import { routeLoader$ } from "@builder.io/qwik-city"
import { fetchProtectedDataHelper } from "~/helpers/fetch-helpers"

export const useProtectedSettingsLoader = routeLoader$(async ({ cookie }) => {
  return fetchProtectedDataHelper(cookie, "/protected/account-settings")
})

export default component$(() => {
  const { sessionState } = useContext(ContextIdGlobalState)

  const allowDisplay = useBanIdlePrefetch()
  const data = useProtectedSettingsLoader()
  return (
    <>
      <Breadcrumbs />
      <div>
        <h2>Your information can be viewed and edited here!</h2>
        <div>
          <div>
            <span>Customer ID : </span>
            <span>{}</span>
          </div>
          <div>
            <span>Nickname : </span>
            <span>{}</span>
            <span>Update</span>
          </div>
          <div>
            <span>Email : </span>
            <span>{}</span>
            <span>Update</span>
          </div>
          <div>-----</div>
          <div>
            <span>Language Preference : </span>
            <span>{}</span>
            <span>Update</span>
          </div>
          <div>
            <span>Dark mode</span>
            <span>On</span>
            <span>Update</span>
          </div>
          <div>-----</div>
          <div>
            <span>Your current point : </span>
            <span>Yourt point</span>
          </div>
          <div>
            <span>Purchase more point</span>
          </div>
        </div>
      </div>
    </>
  )
})
