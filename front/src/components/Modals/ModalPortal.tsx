import { $, component$, useComputed$, useContext } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../context/ContextGlobalState"
import { ModalUserSignIn } from "./ModalParts/ModalUserSignIn"
import { ModalUserRegistration } from "./ModalParts/ModalUserRegistration"
import { EmailAlreadyExistsModal } from "./ModalParts/ModalEmailAlreadyExists"
import { ForgotPasswordModal } from "./ModalParts/ModalForgotPassword"
import { AccountCreationSuccessModal } from "./ModalParts/ModalAccountCreationSuccess"
import { ModalCreateWishlist } from "./ModalParts/ModalCreateWishlist"
import { modalCodes } from "../../config"

const modalComponentMap = {
  MODAL_USER_SIGNIN: <ModalUserSignIn />,
  MODAL_USER_REGISTRATION: <ModalUserRegistration />,
  MODAL_FORGOT_PASSWORD: <ForgotPasswordModal />,
  MODAL_EMAIL_ALREADY_EXISTS: <EmailAlreadyExistsModal />,
  MODAL_ACCOUNT_CREATION_SUCCESSFUL: <AccountCreationSuccessModal />,
  MODAL_CREATE_WISHLIST: <ModalCreateWishlist />,
  MODAL_CLOSE: null
}

export default component$(() => {
  const { modalState } = useContext(ContextIdGlobalState)

  const showModal = useComputed$(() => !!modalComponentMap[modalState.modalCode])

  const handleOutsideModalClick = $((event: MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains("overlay")) {
      modalState.modalCode = modalCodes.MODAL_CLOSE
    }
  })

  return (
    <>
      {showModal.value && (
        <div class="overlay" onClick$={handleOutsideModalClick}>
          {modalComponentMap[modalState.modalCode]}
        </div>
      )}
    </>
  )
})
