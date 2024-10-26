import { component$ } from "@builder.io/qwik"

import { AccountItem } from "../Cards/AccountItem"
export type CardObject = {
  productId: string
  productTitle: string
  streamingPath: string
  downloadPath: string
  purchaseDate: string
  expiryDate: string
  tagsArray: string[]
  thumbSetObject: {
    avif: string[]
    jpeg: string[]
  }
}

type CardObjectArray = { cardObjArray: CardObject[] }

export const IndexItems = component$(({ cardObjArray }: CardObjectArray) => {
  return (
    <>
      <div class="grid p5">
        <h2 class="font-weight-600 font-11">Your Items</h2>

        <div class="grid grid-template-4 gap15 mrla">
          {cardObjArray.map((singleCardObj) => (
            <AccountItem
              cardObj={singleCardObj}
              key={singleCardObj.productId}
            />
          ))}
        </div>
      </div>
    </>
  )
})
