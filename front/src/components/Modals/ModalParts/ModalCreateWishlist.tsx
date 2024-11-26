import { $, component$, useContext, useStore, useTask$ } from "@builder.io/qwik"
import { ContextIdGlobalState } from "../../../context/ContextGlobalState"
import { modalCodes, BACK_URL } from "../../../config"
import { IconClose } from "../../SvgComponents/Icon"
import wretch from "wretch"

export type SuccessfulWishlistCreation = {
  listName: string
}

export const ModalCreateWishlist = component$(() => {
  const { modalState, sessionState } = useContext(ContextIdGlobalState)
  const inputStore = useStore({
    wishlistName: ""
  })

  useTask$(() => {
    if (sessionState.lang === "EN") inputStore.wishlistName = "My shopping list"
    else inputStore.wishlistName = "欲しいものリスト"
  })

  const createNewWishlist = $(async () => {
    const result = await wretch(`${BACK_URL}/wishlist-create`)
      .post({ id: sessionState.id, list_name: inputStore.wishlistName, list_data: undefined })
      .json<SuccessfulWishlistCreation>()
    return result
  })

  return (
    <>
      <div class="modal-auth relative ma p20 gap10">
        <span class="absolute pointer" style={{ right: "10px", top: "10px" }} onClick$={() => (modalState.modalCode = modalCodes.MODAL_CLOSE)}>
          <IconClose />
        </span>
        <h2 class="font-13 ma">Create a new list</h2>

        <div class="">
          <div class="relative grid">
            <div class="pb5">List name</div>
            <input
              class="p10 w100 bg-gray-700 color-white font-8"
              placeholder={inputStore.wishlistName}
              onInput$={e => {
                inputStore.wishlistName = (e.target as HTMLInputElement).value
              }}
            />
          </div>
        </div>
        <div class="font-8">
          You can use this list to save items for later. <span class="color-magenta">All lists are private!</span>
        </div>
        <div
          class="mini-button-magenta font-10"
          onClick$={async () => {
            try {
              const result = await createNewWishlist()
              if (result.listName.length > 0) modalState.modalCode = modalCodes.MODAL_CLOSE
            } catch (err: any) {
              console.log(err)
            }
          }}
        >
          Create
        </div>
      </div>
    </>
  )
})
