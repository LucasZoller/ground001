import { component$, useContext } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"
import { ContextIdGlobalState } from "~/context/ContextGlobalState"

export const AccountMenu = component$(() => {
  const { sessionState } = useContext(ContextIdGlobalState)
  return (
    <>
      <div class="account-menu ptb10">
        <div class="text-align-center border-bottom">
          {sessionState.greeting ? (
            <div class="pb10">
              <span>{sessionState.greeting}</span>
            </div>
          ) : (
            <>
              <Link href="/portal/signin/">
                <div class="mini-button-magenta w300px ma">Sign in</div>
              </Link>
              <div class="p5">
                <span class="font-8">
                  New to us?{" "}
                  <Link href="/portal/register/">
                    <span class="color-magenta pointer">Start here!</span>
                  </Link>
                </span>
              </div>
            </>
          )}
        </div>
        <div class="p5 flex">
          <div class="w300px">
            <h3 class="font-weight-600 font-10 color-headline">Let Us Help You</h3>
            <div class="font-9">
              <Link href="/faq">FAQ</Link>
            </div>
            <div class="font-9">
              <Link href="/our-policies">Our Policies</Link>
            </div>
            <div class="font-9">
              <Link href="/support">Support</Link>
            </div>
          </div>
          <div class="grid gap3 w300px">
            <h3 class="font-weight-600 font-10 color-headline">Your Account</h3>
            <div class="font-9" onClick$={() => {}}>
              <Link href="/account">Account</Link>
            </div>
            <div class="font-9">
              <Link href="/account/orders">Orders</Link>
            </div>
            <div class="font-9">
              <Link href="/account/items">Items</Link>
            </div>
            <div class="font-9">
              <Link href="/account/wishlist">Wish List</Link>
            </div>
            <div class="font-9">
              <Link href="/account/security">Security</Link>
            </div>
            <div class="font-9">
              <Link href="/account/information">Account information</Link>
            </div>
          </div>
        </div>
      </div>
      <div class="dynamic-overlay"></div>
    </>
  )
})
