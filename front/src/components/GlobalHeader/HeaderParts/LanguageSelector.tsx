import { $, component$, useContext } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"

import { FlagEn, FlagJp } from "../../SvgComponents/Flags"
import { IconKeyboardArrowDown } from "../../SvgComponents/Icon"

export default component$(() => {
  const { languageState } = useContext(ContextIdGlobalState)

  const handleShowLanguage = $(() => {
    languageState.showLanguageWindow = true
  })

  const handleCloseLanguage = $(() => {
    languageState.showLanguageWindow = false
  })

  const handleOutsideLanguageWindowClick = $((event: MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains("transparent-overlay")) {
      handleCloseLanguage()
    }
  })
  return (
    <div class="rps-header-lang-box ma">
      <div class="flex mini-button-bone transition300" onClick$={handleShowLanguage}>
        <div class="ma font-7">
          <span>Language : </span>
        </div>
        <div class="pl5 ma flex">{languageState.selectedLanguage === "EN" ? <FlagEn /> : <FlagJp />}</div>
        <div class="ma flex">
          <IconKeyboardArrowDown />
        </div>
      </div>
      {/* Show or hide the language window */}
      <div
        id="language-window"
        class={`absolute grid gap5 mt5 mini-window-gray900 font-9 transition170 ${languageState.showLanguageWindow ? "opacity10 visible" : "opacity0 hidden"}`}
        style={{ zIndex: "100" }}
      >
        {/* Select Language English */}
        <div
          class="mini-window-element-gray900 flex align-center gap10"
          onClick$={() => {
            languageState.selectedLanguage = "EN"
            handleCloseLanguage()
          }}
        >
          <span class="flex align-center">
            <FlagEn />
          </span>
          <span class="">English</span>
        </div>
        {/* Select Language Japanese */}
        <div
          class="mini-window-element-gray900 flex align-center gap10"
          onClick$={() => {
            languageState.selectedLanguage = "JP"
            handleCloseLanguage()
          }}
        >
          <span class="flex align-center">
            <FlagJp />
          </span>
          <span>日本語</span>
        </div>
      </div>

      {languageState.showLanguageWindow && (
        <div onClick$={handleOutsideLanguageWindowClick} class="transparent-overlay">
          {/* Transparent overlay to capture clicks outside */}
        </div>
      )}
    </div>
  )
})
