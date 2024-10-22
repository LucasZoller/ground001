import { $, component$, useContext } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../context/ContextGlobalState"
import { modalCodes } from "../../config"
import { Link } from "@builder.io/qwik-city"
import { Logo } from "../SvgComponents/Logo"
import { IconCart, IconMenu } from "../SvgComponents/Icon"
import { SignIn } from "./HeaderParts/SignIn"
import LanguageSelector from "./HeaderParts/LanguageSelector"
import Search from "./HeaderParts/Search"
import MobileMenu from "./HeaderParts/MobileMenu"
import { useSiteSessionLoader } from "../../loaders/siteSessionLoader"
import { useVerifySiteSession } from "../../hooks/useVerifySiteSession"

export default component$(() => {
  const { modalState, sessionState, mobile } = useContext(ContextIdGlobalState)

  const handleShowMobileMenu = $(() => {
    mobile.showMenu = true
  })

  return (
    <>
      <MobileMenu />
      <div class="flex justify-between rps-header">
        {/* Mobile Menu Button */}
        <div class="rps-mobile-menu-button pointer" onClick$={handleShowMobileMenu}>
          <IconMenu />
        </div>

        {/* Flex left */}
        <div class="flex gap20 justify-between">
          <Link href="/" class="ma grid">
            <Logo />
          </Link>

          {/* Language selector */}
          <LanguageSelector />
        </div>

        {/* Flex middle */}
        <Search />

        {/* Flex right */}
        <div class="flex gap10 relative">
          {/* Sign in button */}
          <SignIn />

          {/* Shopping cart */}
          <div class="flex gap5 pointer">
            <IconCart />
            {/* <div class="ma font8">Cart : 0</div> */}
          </div>
          {/* Register button */}
          {!sessionState.isValidRtFound && (
            <div
              class="mini-button-dolphin ma"
              onClick$={() => {
                modalState.modalCode = modalCodes.MODAL_USER_REGISTRATION
              }}
            >
              <span class="font-8">Join for FREE!</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
})
