import { component$, useContext } from "@builder.io/qwik"
import { ContextIdUserState } from "~/context/ContextUserState"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"
export default component$(() => {
  const userState = useContext(ContextIdUserState)
  return (
    <>
      <Breadcrumbs />
      <div>
        <h2>Your information can be viewed and edited here!</h2>
        <div>
          <div>
            <span>Customer ID : </span>
            <span>{userState.user_code}</span>
          </div>
          <div>
            <span>Nickname : </span>
            <span>{userState.user_name}</span>
            <span>Update</span>
          </div>
          <div>
            <span>Email : </span>
            <span>{userState.email}</span>
            <span>Update</span>
          </div>
          <div>-----</div>
          <div>
            <span>Language Preference : </span>
            <span>{userState.lang}</span>
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
