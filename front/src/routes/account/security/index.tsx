import { component$, useContext } from "@builder.io/qwik"
import { ContextIdUserState } from "~/context/ContextUserState"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"
export default component$(() => {
  const userState = useContext(ContextIdUserState)
  return (
    <>
      <Breadcrumbs />
      <div>
        <h2>You can change your account password here!</h2>
        <div>
          <div>
            <div>
              <span>Email : </span>
              <span>{userState.email}</span>
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
