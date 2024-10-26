import { component$ } from "@builder.io/qwik"
import { IconDelete } from "../SvgComponents/Icon"
import { Link } from "@builder.io/qwik-city"
import { MiniButton } from "../UtilityComponents/MiniButton"
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
type WishItemObjArr = { wishItemObjArr: WishItem[] }
export const IndexWish = component$(({ wishItemObjArr }: WishItemObjArr) => {
  return (
    <div class="grid">
      <div class="ma w100" style={{ maxWidth: "920px" }}>
        <h2 class="font-weight-600 font-11 ptb5">Your List</h2>
        {wishItemObjArr.map((singleWishItem) => (
          <div class="radius5 bg-gray-900" style={{ overflow: "hidden" }}>
            <div class="grid wish-card gap8 p8">
              <div class="flex gap8">
                <picture class="inline-block order-card-body-thumb mtba">
                  <source
                    srcset={singleWishItem.thumbSetObject.avif[0]}
                    type="image/avif"
                  />
                  <source
                    srcset={singleWishItem.thumbSetObject.jpeg[0]}
                    type="image/jpeg"
                  />

                  <img
                    width="320"
                    height="180"
                    style={{ maxWidth: "100%", height: "auto" }}
                    src={singleWishItem.thumbSetObject.jpeg[0]}
                    alt="small thumbnail for order page"
                  />
                </picture>
                <div class="">
                  <div class="font-8">{singleWishItem.productId}</div>
                  <div class="font-10 color-magenta">
                    {singleWishItem.productTitle}
                  </div>
                  <div>{`$${singleWishItem.productPrice}`}</div>
                  <div class="font-8">{`Item added ${singleWishItem.itemAddedOn}`}</div>
                </div>
              </div>

              <div class="mrla w100">
                <Link class="mini-button-orange w100">Add to Cart</Link>

                <div class="flex gap5 mt5">
                  {/* <Link class="mini-button-dolphin mtba">
                    <div>Play Sample</div>
                  </Link>
                  <div class="mini-button-bone w150px">
                    <IconDelete size={18} />
                  </div> */}
                  <MiniButton
                    obj={{
                      url: "test-url-001",
                      bg: "dolphin",
                      w: "80%",
                    }}>
                    Play Test
                  </MiniButton>
                  <MiniButton
                    obj={{
                      url: "test-url-001",
                    }}>
                    <IconDelete size={21} />
                  </MiniButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})
