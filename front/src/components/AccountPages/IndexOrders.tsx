import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"

export type OrderObject = {
  purchasedDate: string
  totalPrice: string
  orderId: string
  items: OrderedItem[]
}

export type OrderedItem = {
  productId: string
  productTitle: string
  productPrice: string
  expiryDate: string
  streamingPath: string
  downloadPath: string
  thumbSetObject: {
    avif: string[]
    jpeg: string[]
  }
}
type OrderObjectsArray = { orderObjArr: OrderObject[] }

export const IndexOrders = component$(({ orderObjArr }: OrderObjectsArray) => {
  return (
    <div class="grid">
      <div class="ma w100" style={{ maxWidth: "920px" }}>
        <h2 class="font-weight-600 font-11 ptb5">Your Orders</h2>
        {orderObjArr.map((singleOrderObj, index) => (
          <div class="radius5 bg-gray-900" style={{ overflow: "hidden" }}>
            <div class="bg-gray-1000 p8 grid order-card-header">
              <div>
                <div class="font-7">ORDER PLACED</div>
                <div class="font-9">{singleOrderObj.purchasedDate}</div>
              </div>
              <div>
                <div class="font-7">TOTAL</div>
                <div class="font-9">${singleOrderObj.totalPrice}</div>
              </div>
              <div class="text-align-right">
                <div class="font-7">ORDER # </div>
                <div class="font-9">{singleOrderObj.orderId}</div>
              </div>
            </div>
            <div class="p8">
              {singleOrderObj.items.map(singleItem => (
                <div class="grid order-card-body prl8 ptb10" key={singleItem.productId}>
                  <div class="flex">
                    <picture class="inline-block order-card-body-thumb mtba">
                      <source srcset={singleItem.thumbSetObject.avif[0]} type="image/avif" />
                      <source srcset={singleItem.thumbSetObject.jpeg[0]} type="image/jpeg" />

                      <img
                        width="320"
                        height="180"
                        style={{ maxWidth: "100%", height: "auto" }}
                        src={singleItem.thumbSetObject.jpeg[0]}
                        alt="small thumbnail for order page"
                      />
                    </picture>
                    <div class="ml15">
                      <div class="font-9">{`${singleItem.productId}:`}</div>
                      <div class="font-12 color-magenta pt4">{singleItem.productTitle}</div>
                    </div>
                  </div>
                  <div class="flex order-card-buttons">
                    <div class="grid gap5">
                      <div class="flex-grid gap7 justify-center">
                        <Link href={singleItem.streamingPath} class="mini-button-dolphin order-buttons-width">
                          Play
                        </Link>
                        <Link href={singleItem.downloadPath} class="mini-button-magenta order-buttons-width">
                          Download
                        </Link>
                      </div>
                      <div class="font-8 text-align-center">
                        <span>Available until : </span>
                        <span class="color-success nowrap">{singleItem.expiryDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {index === orderObjArr.length - 1 && <span class="end-of-list-border nowrap font-8 color-gray-600 mb10">End of your list</span>}
          </div>
        ))}
      </div>
    </div>
  )
})
