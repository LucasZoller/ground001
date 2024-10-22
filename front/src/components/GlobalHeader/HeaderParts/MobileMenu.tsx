import { $, component$, useContext } from "@builder.io/qwik"
import { Logo } from "../../SvgComponents/Logo"
import { IconClose, IconSignIn } from "../../SvgComponents/Icon"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"

export default component$(() => {
  const { mobile } = useContext(ContextIdGlobalState)

  const handleCloseMobileMenu = $(() => {
    mobile.showMenu = false
  })
  const handleOutsideMobileMenuClick = $((event: MouseEvent) => {
    if ((event.target as HTMLElement).classList.contains("transparent-overlay")) {
      handleCloseMobileMenu()
    }
  })
  return (
    <>
      <div class={`rps-mobile-menu p10 transition100 w300px ${mobile.showMenu ? "opacity10 visible" : "opacity0 hidden"}`}>
        <div class="pointer" onClick$={handleCloseMobileMenu}>
          <IconClose size={20} fill={"#f500cf"} />
        </div>
        <Logo size={80} fill={"#fff"} />

        <div>
          <IconSignIn />
          Register
        </div>
        <div>Sign in</div>
        <div>---</div>
        <div>Content001</div>
        <div>Content002</div>
        <div>Content003</div>
        <div>Content004</div>
        <div>Content005</div>
        <div>---</div>
        <div>Language</div>
        <div>Mode</div>
      </div>
      {mobile.showMenu && <div onClick$={handleOutsideMobileMenuClick} class="transparent-overlay"></div>}
    </>
  )
})
