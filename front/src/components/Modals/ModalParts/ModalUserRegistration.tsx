import { $, component$, useContext, useStore, useTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"
import { ContextIdAuthState } from "../../../context/ContextAuthState"
import { BACK_URL, modalCodes } from "../../../config"
import { UserRegistrationPayload, DatabaseResponse } from "../../../types"
import wretch from "wretch"
import { IconCheckCircle, IconClose, IconVisible, IconVisibleOff, IconWarning } from "../../SvgComponents/Icon"

const useRegisterUser = () => {
  const registerUser = $(async (payload: UserRegistrationPayload): Promise<DatabaseResponse> => {
    try {
      const data = await wretch(`${BACK_URL}/auth-user-create`).options({ credentials: "include" }).post(payload).json<DatabaseResponse>()
      return data
    } catch (err) {
      throw err // Re-throwing to ensure the function returns a consistent type
    }
  })
  return registerUser
}

export const ModalUserRegistration = component$(() => {
  const { modalState, languageState, sessionState } = useContext(ContextIdGlobalState)
  const authState = useContext(ContextIdAuthState)
  const inputStore = useStore({
    emailFocused: false,
    passwordFocused: false,
    passwordVisible: false,
    emailHelper: false,
    passwordHelper: false,
    emailValue: "",
    passwordValue: ""
  })

  useTask$(({ track }) => {
    const watchEmailValue = track(() => inputStore.emailValue)
    const watchPasswordValue = track(() => inputStore.passwordValue)

    if (watchEmailValue.length > 0 && inputStore.emailHelper === true) {
      inputStore.emailHelper = false
    }
    if (watchPasswordValue.length > 0 && inputStore.passwordHelper === true) {
      inputStore.passwordHelper = false
    }
  })
  const registerUser = useRegisterUser()

  return (
    <>
      <div class="modal-auth relative ma p20 gap10">
        <span class="absolute pointer" style={{ right: "10px", top: "10px" }} onClick$={() => (modalState.modalCode = modalCodes.MODAL_CLOSE)}>
          <IconClose />
        </span>
        <h2 class="font-13 ma">Join now for Free!</h2>
        <p class="ma">
          Sign up for free to AKNM.nl or{" "}
          <span class="color-magenta pointer" onClick$={() => (modalState.modalCode = modalCodes.MODAL_USER_SIGNIN)}>
            Sign in
          </span>
        </p>
        <div class="">
          <div class="relative grid">
            <input
              type="text"
              class="p10 w100 bg-gray-600 color-white font-08"
              onFocus$={() => (inputStore.emailFocused = true)}
              onBlur$={() => {
                inputStore.emailFocused = false
                inputStore.emailValue === "" && (inputStore.emailHelper = true)
              }}
              onInput$={e => {
                inputStore.emailValue = (e.target as HTMLInputElement).value
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
                <IconWarning />
              </span>
            )}
          </div>
          <div style={{ height: "18px" }}>{inputStore.emailHelper && <span class="font-7 color-magenta">Please enter your email address.</span>}</div>
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
          <div style={{ height: "18px" }}>{inputStore.passwordHelper && <span class="font-7 color-magenta">Please enter the password.</span>}</div>
        </div>
        <div class="grid gap4 mb7">
          <span class="font-9">Your password must have</span>
          <div class="flex align-center gap5">
            <span class="flex">
              <IconCheckCircle />
            </span>
            <span class="font-8">Minimum 8 characters</span>
          </div>

          <div class="flex gap5 mtba">
            <span class="flex">
              <IconCheckCircle />
            </span>
            <span class="font-8">Letters, numbers, or special characters</span>
          </div>
        </div>
        <div
          class="mini-button-magenta font-10"
          onClick$={async () => {
            try {
              const data = await registerUser({ email: inputStore.emailValue, password: inputStore.passwordValue, language: languageState.selectedLanguage })
              if (data.at && data.atExp) {
                authState.at = data.at
                sessionState.atExp = data.atExp
                modalState.modalCode = modalCodes.MODAL_ACCOUNT_CREATION_SUCCESSFUL
              }
            } catch (err: any) {
              if (err.json.code === "ERR_EMAIL_EXISTS") {
                modalState.modalCode = modalCodes.MODAL_EMAIL_ALREADY_EXISTS
              }
              console.log("🎉🎉🎉Hold on! You are seeing the error here! : ", err)
            }
          }}
        >
          Sign up for free
        </div>
        <div class="mtb5 font-7">
          <span>By continuing, you certify that you are 18 years of age or older and you agree to aknm.nl’s </span>
          <span class="color-magenta pointer">Terms of Service</span>
          <span> and confirm that you have read the aknm.nl’s </span>
          <span class="color-magenta pointer">Privacy Notice</span>
          <span>.</span>
        </div>
      </div>
    </>
  )
})
