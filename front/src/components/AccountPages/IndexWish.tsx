import { component$, useContext } from "@builder.io/qwik"
import { IconDelete } from "../SvgComponents/Icon"
import { Link } from "@builder.io/qwik-city"
import { MiniButton } from "../UtilityComponents/MiniButton"
import { ContextIdGlobalState } from "../../context/ContextGlobalState"
import { modalCodes } from "../../config"
type WishItem = {
  itemAddedOn: string
  productId: string
  productTitle: string
  productPrice: string
  thumbSetObject: {
    avif: string[]
    jpeg: string[]
  }
}
type WishIndexObj = {
  wishItemObjArr: WishItem[]
  isLastSlice: boolean
}
export const IndexWish = component$(({ wishItemObjArr, isLastSlice }: WishIndexObj) => {
  const { modalState } = useContext(ContextIdGlobalState)
  console.log("🎐🎐🎐 let's check the is last value!", isLastSlice)
  return (
    <div class="grid">
      {/* Scrollable list of wishlist  */}
      <div style={{ overflow: "auto" }}>
        <div style={{ width: "100%", whiteSpace: "nowrap" }}>
          <div class="mini-button-magenta mtba" style={{ display: "inline-block" }} onClick$={() => (modalState.modalCode = modalCodes.MODAL_CREATE_WISHLIST)}>
            Add another wishlist +
          </div>
          <div class="box-cadetblue" style={{ textAlign: "center", display: "inline-block" }}>
            My wishlist that have a very long title
          </div>
          <div class="box-cadetblue" style={{ textAlign: "center", display: "inline-block" }}>
            My second wishlist with a super long title
          </div>
          <div class="box-cadetblue" style={{ textAlign: "center", display: "inline-block" }}>
            My third wishlist
          </div>
        </div>
      </div>

      <div class="ma w100vw" style={{ maxWidth: "920px" }}>
        <h2 class="font-weight-600 font-11 ptb5">Your List</h2>
        <div class="radius5 bg-gray-900 p8" style={{ overflow: "hidden" }}>
          {wishItemObjArr.map((singleWishItem, index) => (
            <div class="grid wish-card responsive-padding gap8 ptb9 border-bottom-until-last" key={singleWishItem.productId}>
              <div class="flex gap8">
                <picture class="inline-block order-card-body-thumb mtba" style={{ minWidth: "150px" }}>
                  <source media="(max-width:768px)" srcset={singleWishItem.thumbSetObject.avif[0]} type="image/avif" />
                  <source media="(max-width:768px)" srcset={singleWishItem.thumbSetObject.jpeg[0]} type="image/jpeg" />
                  <source media="(min-width:769px)" srcset={singleWishItem.thumbSetObject.avif[1]} type="image/avif" />
                  <source media="(min-width:769px)" srcset={singleWishItem.thumbSetObject.jpeg[1]} type="image/jpeg" />

                  <img
                    width="320"
                    height="180"
                    style={{ maxWidth: "100%", height: "auto" }}
                    src={singleWishItem.thumbSetObject.jpeg[1]}
                    alt="small thumbnail for order page"
                  />
                </picture>
                <div class="">
                  <div class="font-8">{singleWishItem.productId}</div>
                  <div class="font-10 color-magenta">{singleWishItem.productTitle}</div>
                  <div class="font-9">
                    Price: $<span class="font-12 font-weight-500">{`${singleWishItem.productPrice}`}</span>
                  </div>
                  <div class="font-8 color-gray-500">{`Item added ${singleWishItem.itemAddedOn}`}</div>
                </div>
              </div>

              <div class="ma w100">
                <Link class="mini-button-orange w100">Add to Cart</Link>

                <div class="flex gap5 mt5">
                  <MiniButton
                    obj={{
                      url: "test-url-001",
                      bg: "dolphin",
                      w: "80%"
                    }}
                  >
                    Play Sample
                  </MiniButton>
                  <MiniButton
                    obj={{
                      url: "test-url-001"
                    }}
                  >
                    <IconDelete size={21} />
                  </MiniButton>
                </div>
              </div>
            </div>
          ))}
        </div>
        {isLastSlice && <span class="end-of-list-border nowrap font-8 color-gray-600 mt10">End of your list</span>}
      </div>
    </div>
  )
})
