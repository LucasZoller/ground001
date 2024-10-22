import { component$ } from "@builder.io/qwik"
import { DivPlayAndDownloadButtons } from "./CardParts/DivPlayAndDownloadButtons"
import { DivTags } from "./CardParts/DivTags"
import { DivThumbnail } from "./CardParts/DivThumbnail"
import { DivPurchaseDateAndExpiryDate } from "./CardParts/DivPurchaseDateAndExpiryDate"
import { CardObject } from "../AccountPages/IndexItem"

export const AccountItem = component$(({ cardObj }: { cardObj: CardObject }) => {
  return (
    <>
      {/* Single product card used in the user account item page */}
      <div class="bg-gray-900 radius5 inline-block ptb10" style={{ maxWidth: "350px" }}>
        <DivThumbnail thumbSet={cardObj.thumbSetObject} />
        <div class="prl5">
          <hr class="mt10 mb5 border-bottom-gray-700" />

          <div class="color-magenta font-8">{cardObj.productId}</div>
          <h3 class="font-9">{cardObj.productTitle}</h3>

          <hr class="mtb5 border-bottom-gray-700" />

          <DivTags tags={cardObj.tagsArray} />

          <hr class="mtb5 border-bottom-gray-700" />

          <DivPlayAndDownloadButtons streamingPath={cardObj.streamingPath} downloadPath={cardObj.downloadPath} />

          <hr class="mtb5 border-bottom-gray-700" />
          <DivPurchaseDateAndExpiryDate expiryDate={cardObj.expiryDate} purchaseDate={cardObj.purchaseDate} />
        </div>
      </div>
    </>
  )
})
