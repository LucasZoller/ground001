import { component$ } from "@builder.io/qwik"
import ImgAknm024Thumb260px from "../../../../public/images/aknm024-thumb-260px.jpg?jsx"
import { Breadcrumbs } from "../../../components/UtilityComponents/Breadcrums"
export default component$(() => {
  return (
    <>
      <Breadcrumbs />
      <div>
        <h2>Your Items can be viewed here!</h2>
        <div>
          <div>
            <div class="inline-block w200px">
              <ImgAknm024Thumb260px class="w100 ha" />
            </div>
            <div>
              <div>Product number</div>
              <div>Title of the product</div>
            </div>
            <div>
              <span>Play Here</span>
              <span>Download</span>
            </div>
            <div>
              <span>Expiry Date : </span>
              <span>2025.02.25</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
})
