import { component$, useContext, useStore, useTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"
import { modalCodes } from "../../../config"
import { IconClose } from "../../SvgComponents/Icon"

export const EmailAlreadyExistsModal = component$(() => {
  const { modalState } = useContext(ContextIdGlobalState)
  const inputStore = useStore({
    passwordFocused: false,
    passwordVisible: false,
    passwordHelper: false,
    passwordValue: ""
  })

  useTask$(({ track }) => {
    const watchPasswordValue = track(() => inputStore.passwordValue)
    if (watchPasswordValue.length > 0 && inputStore.passwordHelper === true) {
      inputStore.passwordHelper = false
    }
  })

  return (
    <>
      <div class="modal-auth relative ma p20 gap10">
        <span class="absolute pointer" style={{ right: "10px", top: "10px" }} onClick$={() => (modalState.modalCode = modalCodes.MODAL_CLOSE)}>
          <IconClose />
        </span>
        <h2 class="font-13 ma">Email already exists</h2>

        <div>
          <div class="relative grid">
            <input
              type={inputStore.passwordVisible ? "text" : "password"}
              class="p10 w100 bg-gray-600 color-white font-08"
              onFocus$={() => (inputStore.passwordFocused = true)}
              onBlur$={() => {
                inputStore.passwordFocused = false
                inputStore.passwordValue === "" && (inputStore.passwordHelper = true)
              }}
              onInput$={e => (inputStore.passwordValue = (e.target as HTMLInputElement).value)}
              value={inputStore.passwordValue}
            />
            <label
              class="absolute flex align-center h100 transition300"
              style={{
                left: inputStore.passwordFocused || inputStore.passwordValue !== "" ? "16px" : "8px",
                top: inputStore.passwordFocused || inputStore.passwordValue !== "" ? "-20px" : "0",
                fontSize: inputStore.passwordFocused || inputStore.passwordValue !== "" ? ".7rem" : "1rem",
                pointerEvents: "none"
              }}
            >
              Password
            </label>

            <span
              class="absolute flex align-center h100 pointer"
              style={{ right: "8px" }}
              onClick$={() => (inputStore.passwordVisible = !inputStore.passwordVisible)}
            >
              {inputStore.passwordVisible ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 -960 960 960" fill="#fff">
                  <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" viewBox="0 -960 960 960" fill="#fff">
                  <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                </svg>
              )}
            </span>
          </div>
          <div style={{ height: "20px" }}>{inputStore.passwordHelper && <span class="font-7 color-magenta">Please enter your email address.</span>}</div>
        </div>

        <p class="grid ma">
          <span class="ma">It seems that you are already with us!</span>
        </p>

        <div class="mini-button-magenta font-10">Sign in</div>

        <div class="ma">
          Forgot Your Password?{" "}
          <span class="color-magenta pointer" onClick$={() => (modalState.modalCode = modalCodes.MODAL_FORGOT_PASSWORD)}>
            Click Here!
          </span>
        </div>
      </div>
    </>
  )
})
