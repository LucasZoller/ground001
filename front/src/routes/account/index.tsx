import { component$, useContext, useTask$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "../../context/ContextGlobalState"
import { isBrowser, isServer } from "@builder.io/qwik/build"

export default component$(() => {
  const { sessionState } = useContext(ContextIdGlobalState)
  useTask$(() => {
    if (isServer) {
      console.log("🐢🐢🐢task is running from layout.")
    }
    if (isBrowser) {
      console.log("🐢🐢🐢🐢🐢🐢task is running from layout.")
    }
  })

  return (
    <>
      <div>
        {sessionState.userName ? (
          <div>
            <h3>{`Your Account : Welcome back, ${sessionState.userName}!😊`}</h3>
          </div>
        ) : (
          <div>
            <span>Your Account</span>
          </div>
        )}
        <div>{sessionState.lang === "EN" ? `Your language setting is currently English.` : `Your language setting is currently Japanese`}</div>
        <div>
          <h4>Information</h4>
          <span>New Arrivals!</span>
          <span>Relase day: 202412.09 - Title: "blablabla"</span>
        </div>
        <div>
          <div>
            <div class="mini-button-magenta w300px m5">
              <Link href="/account/orders">Your Orders</Link>
            </div>
            <div class="mini-button-magenta w300px m5">
              <Link href="/account/items">Your Items</Link>
            </div>
            <div class="mini-button-magenta w300px m5">
              <Link href="/account/wishlist">Your Wish Lists</Link>
            </div>
          </div>
          <div>
            <div class="mini-button-dolphin w300px m5">
              <Link href="/account/security">Login & Security</Link>
            </div>
            <div class="mini-button-dolphin w300px m5">
              <Link href="/account/settings">Your Account Settings</Link>
            </div>
          </div>
          <div>
            <div>FAQ</div>
            <div>Our Policies</div>
            <div>Customer Support</div>
          </div>
        </div>
      </div>
    </>
  )
})
