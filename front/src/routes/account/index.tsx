import { component$ } from "@builder.io/qwik"
import { useAuth } from "../../hooks/useAuth"
import { Link } from "@builder.io/qwik-city"

export default component$(() => {
  const { userState, sessionState } = useAuth()
  return (
    <>
      <div>
        {userState.user_code ? (
          <div>
            <h3>{`Your Account : Welcome back, ${userState.user_name}!😊`}</h3>
            <div>{`Your mail :  ${userState.email}!📨`}</div>
          </div>
        ) : (
          <div>
            <span>Your Account</span>
          </div>
        )}
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
              <Link href="/account/information">Your Account Information</Link>
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
