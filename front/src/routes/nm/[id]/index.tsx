import { component$ } from "@builder.io/qwik"
import { useLocation } from "@builder.io/qwik-city"
import { IconHeart } from "../../../components/SvgComponents/Icon"

export default component$(() => {
  const pageId = useLocation().params.id
  console.log("what is the useLocation() ? :", useLocation())
  console.log("what is the useLocation().param ? :", useLocation().params)
  return (
    <>
      <div class="grid rsp-main-width">
        <div>{pageId}</div>
        <h2 class="font13 font-weigth-600">Get the AKNM sex title from the pageId!</h2>
        <div class="w100">
          <img class="w100 ha" width="600" height="337" src={`/public/images/aknm024-thumb-800px.jpg`} />
        </div>
        <div>
          <span>AKNM Category :</span>
          <span>blue</span>
        </div>
        <div class="">
          <span class="tag-box">teen</span>
          <span class="tag-box">blowjob</span>
          <span class="tag-box">thick thighs</span>
          <span class="tag-box">cream pie</span>
          <span class="tag-box">loud sex noise</span>
        </div>
        <div class="">
          <span>$</span>
          <span class="ml4">16.59</span>
        </div>
        <div>
          <IconHeart size={24} fill="#ff0000" />
        </div>
        <div>
          <div class="mini-button-magenta ma">Add To Cart</div>
        </div>

        <div>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
        </div>
      </div>
    </>
  )
})
