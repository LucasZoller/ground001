import { component$ } from "@builder.io/qwik"

export const DivPurchaseDateAndExpiryDate = component$((prop: { expiryDate: string; purchaseDate: string }) => {
  return (
    <>
      <div class="text-align-center pt5 font-9">
        Purchased on : <span class="color-success">{prop.purchaseDate}</span>
      </div>
      <div class="text-align-center pt5 font-9">
        Available until : <span class="color-magenta">{prop.expiryDate}</span>
      </div>
    </>
  )
})
