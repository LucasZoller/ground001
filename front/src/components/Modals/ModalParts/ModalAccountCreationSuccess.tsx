import { component$, useContext } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"
import { modalCodes } from "../../../config"
import { IconClose } from "../../SvgComponents/Icon"

export const AccountCreationSuccessModal = component$(() => {
  const { modalState } = useContext(ContextIdGlobalState)
  return (
    <>
      <div class="modal-message relative ma p20 gap10">
        <span class="absolute pointer" style={{ right: "10px", top: "10px" }} onClick$={() => (modalState.modalCode = modalCodes.MODAL_CLOSE)}>
          <IconClose />
        </span>
        <div class="font-11 color-success ma">Your account was successfully created.</div>
        <div class="font-11 color-success ma">Welcome to AKNM!</div>
      </div>
    </>
  )
})
