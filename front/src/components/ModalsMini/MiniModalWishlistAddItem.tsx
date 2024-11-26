import { $, component$, useContext } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../context/ContextGlobalState"
import wretch from "wretch"
import { BACK_URL } from "../../config"
type PropsWishlistAddItem = {
  props: { productId: String; productCode: string }
}

export const MiniModalWishlistAddItem = component$((obj: PropsWishlistAddItem) => {
  const { sessionState } = useContext(ContextIdGlobalState)

  const addSingleItemToWishlist = $(() => {
    console.log(
      "🔥Firing addSingleItemToWishlist! This product's id is :",
      obj.props.productId,
      "and the product category is :",
      obj.props.productCode.slice(0, 5)
    )
  })

  return (
    <>
      <div class="realtive">
        <div class="radius10 pointer font-9 p4" style={{ border: "1px solid var(--gray-500)", textAlign: "center" }}>
          Add to List💙
        </div>
        <div class="p5 absolute bg-gray-700">
          <div
            class="p4 pointer hover-bg-gray-800 flex justify-between gap5"
            style={{ borderBottom: "1px solid var(--gray-600)" }}
            onClick$={() => addSingleItemToWishlist()}
          >
            <div class="font-8">My first list</div>
            <div class="font-7"> (5/20)</div>
          </div>
          <div class="p4 pointer hover-bg-gray-800 flex justify-between gap5" style={{ borderBottom: "1px solid var(--gray-600)" }}>
            <div class="font-8">My second list and the title is super long!</div>
            <div class="font-7"> (6/20)</div>
          </div>
          <div>
            <input class="p5 w100 font-7" placeholder="Optionally add some comment!" />
          </div>
          <div class="p4 pointer hover-bg-gray-800 text-align-center">
            <div class="color-blue font-7"> + Create a new List</div>
          </div>
        </div>
      </div>
    </>
  )
})
