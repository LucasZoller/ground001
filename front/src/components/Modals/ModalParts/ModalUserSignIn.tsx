import { component$, useContext, useStore, useTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"
import { useSignInUser } from "../../../hooks/useSignInUser"
import { modalCodes } from "../../../config"
import { IconClose, IconVisible, IconVisibleOff, IconWarning } from "../../SvgComponents/Icon"

export const ModalUserSignIn = component$(() => {
  const { modalState } = useContext(ContextIdGlobalState)
  const inputStore = useStore({
    emailFocused: false,
    emailHelper: false,
    passwordFocused: false,
    passwordVisible: false,
    passwordHelper: false,
    emailValue: "",
    passwordValue: "",
    errorMessage: "",
    isErrCodePresent: false
  })

  useTask$(({ track }) => {
    track(() => inputStore.emailValue)
    track(() => inputStore.passwordValue)
    inputStore.isErrCodePresent = false
    inputStore.errorMessage = ""

    if (inputStore.emailValue.length > 0 && inputStore.emailHelper === true) {
      inputStore.emailHelper = false
    }
    if (inputStore.passwordValue.length > 0 && inputStore.passwordHelper === true) {
      inputStore.passwordHelper = false
    }
  })
  const userSignIn = useSignInUser()

  return (
    <>
      <div class="modal-auth relative ma p20 gap10">
        <span class="absolute pointer" style={{ right: "10px", top: "10px" }} onClick$={() => (modalState.modalCode = modalCodes.MODAL_CLOSE)}>
          <IconClose />
        </span>
        <h2 class="font-13 ma">Log in</h2>
        <p class="ma">
          Log in to AKNM.nl or{" "}
          <span class="color-magenta pointer" onClick$={() => (modalState.modalCode = modalCodes.MODAL_USER_REGISTRATION)}>
            Create an Account
          </span>
        </p>
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
                <IconWarning />
              </span>
            )}
          </div>
          <div style={{ height: "20px" }}>{inputStore.emailHelper && <span class="font-7 color-magenta">Please enter your email address.</span>}</div>
        </div>

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
              {inputStore.passwordVisible ? <IconVisible /> : <IconVisibleOff />}
            </span>
          </div>
          <div style={{ height: "20px" }}>{inputStore.passwordHelper && <span class="font-7 color-magenta">Please enter your password.</span>}</div>
        </div>
        {inputStore.isErrCodePresent && <div class="font-7 color-magenta">{inputStore.errorMessage}</div>}

        <div
          class="mini-button-magenta font-10"
          onClick$={async () => {
            try {
              if (inputStore.emailValue.length < 5 || inputStore.passwordValue.length < 3) {
                inputStore.emailHelper = true
                inputStore.passwordHelper = true
              } else {
                const db = await userSignIn({ email: inputStore.emailValue, password: inputStore.passwordValue })
              }
            } catch (err: any) {
              console.log("Can we have an err code? :", err)
              console.log("Can we have an err code? :", err.json.code)
              switch (err.json.code) {
                case "ERR_USER_NOT_FOUND":
                case "ERR_WRONG_PASSWORD":
                  inputStore.isErrCodePresent = true
                  inputStore.errorMessage = "User name or password is wrong."
                  break
                case "ERR_FORM_NOT_FILLED":
                  inputStore.emailHelper = true
                  inputStore.passwordHelper = true
                  break
              }

              // Change messages depending on the database response.
            }
          }}
        >
          Sign in
        </div>
        <div class="ma">
          Forgot Password?{" "}
          <span class="color-magenta pointer" onClick$={() => (modalState.modalCode = modalCodes.MODAL_FORGOT_PASSWORD)}>
            Click Here
          </span>
        </div>
      </div>
    </>
  )
})
