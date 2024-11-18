import { component$, useStore, useTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"
import { useSignInUser } from "../../../hooks/useSignInUser"
import { modalCodes } from "../../../config"
import { Logo } from "../../../components/SvgComponents/Logo"
import { IconVisible, IconVisibleOff, IconWarning } from "../../../components/SvgComponents/Icon"
import { Link } from "@builder.io/qwik-city"

export default component$(() => {
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
  const count = useStore({ val: 0 })
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
  // ↑ 2024.Nov 16th : This never runs on server-side. It is always run client-side.
  // Because userSignIn is triggered by a user click.
  // User click can only happen after the page has been rendered.
  // So, the cookie setting works even without being inside useVisibleTask$.

  //That's the reason why it is

  return (
    <>
      <div class="overlay overlay-dark"></div>
      <div class="z-index-10 mtba float-center">
        <div class="text-align-center pb10">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div class="modal-auth relative mrla gap10 bg-gray-900 p25">
          <h2 class="font-13 ma">Sign in</h2>
          <div class="ma">
            <span class="font-9">
              New to AKNM?{" "}
              <span class="color-magenta pointer">
                <Link href="/portal/register">Create your account</Link>
              </span>
            </span>
          </div>
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
            <span class="font-8">
              Forgot password?{" "}
              <span class="color-magenta pointer">
                <Link href="/portal/forgot-password">Click Here</Link>
              </span>
            </span>
          </div>
        </div>
      </div>
    </>
  )
})
