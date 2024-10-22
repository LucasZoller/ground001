import { component$, useContext, useStore, useTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"
import { modalCodes } from "../../../config"
import { IconClose } from "../../SvgComponents/Icon"

export const ForgotPasswordModal = component$(() => {
  const { modalState } = useContext(ContextIdGlobalState)
  const inputStore = useStore({
    emailFocused: false,
    emailHelper: false,
    emailValue: ""
  })

  useTask$(({ track }) => {
    const watchEmailValue = track(() => inputStore.emailValue)

    if (watchEmailValue.length > 0 && inputStore.emailHelper === true) {
      inputStore.emailHelper = false
    }
  })

  return (
    <>
      <div class="modal-auth relative ma p20 gap10">
        <span class="absolute pointer" style={{ right: "10px", top: "10px" }} onClick$={() => (modalState.modalCode = modalCodes.MODAL_CLOSE)}>
          <IconClose />
        </span>
        <h2 class="font-13 ma">Forgot your password?</h2>

        <div class="">
          <div class="relative grid">
            <input
              class="p10 w100 bg-gray-600 color-white font-08"
              onFocus$={() => (inputStore.emailFocused = true)}
              onBlur$={() => {
                inputStore.emailFocused = false
                inputStore.emailValue === "" && (inputStore.emailHelper = true)
              }}
              onInput$={e => {
                inputStore.emailValue = (e.target as HTMLInputElement).value
                console.log(inputStore.emailValue)
              }}
              value={inputStore.emailValue}
            />
            <label
              class="absolute flex align-center h100 transition300"
              style={{
                left: inputStore.emailFocused || inputStore.emailValue !== "" ? "16px" : "8px",
                top: inputStore.emailFocused || inputStore.emailValue !== "" ? "-20px" : "0",
                fontSize: inputStore.emailFocused || inputStore.emailValue !== "" ? ".7rem" : "1rem",
                pointerEvents: "none"
              }}
            >
              Email
            </label>
            {inputStore.emailHelper && (
              <span class="absolute flex align-center h100" style={{ right: "8px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 -960 960 960" fill="#fff">
                  <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                </svg>
              </span>
            )}
          </div>
          <div style={{ height: "20px" }}>{inputStore.emailHelper && <span class="font-7 color-magenta">Please enter your email address.</span>}</div>
        </div>

        <div class="mini-button-magenta font-10">Send Link</div>
        <div class="ma">
          <span class="color-magenta pointer" onClick$={() => (modalState.modalCode = modalCodes.MODAL_USER_SIGNIN)}>
            Log in
          </span>
        </div>
      </div>
    </>
  )
})
