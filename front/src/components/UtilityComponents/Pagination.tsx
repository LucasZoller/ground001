import { component$ } from "@builder.io/qwik"
import { Link, useLocation } from "@builder.io/qwik-city"

type PaginationObj = {
  totalPages: number
}

export const Pagination = component$(({ totalPages }: PaginationObj) => {
  const pagesArr = Array.from({ length: totalPages }, (_, i) => i + 1)
  const location = useLocation()
  console.log("location output :", location)
  console.log("location path : ", location.url.pathname.split("/").slice(0, 3).join("/") + "/")
  const path = location.url.pathname.split("/").slice(0, 3).join("/") + "/"
  const currentPage = parseInt(location.params.page)
  return (
    <div class="flex justify-center gap15">
      {currentPage !== 1 && (
        <Link class="mtba" href={`${path}${currentPage - 1}`}>
          <span class="pagination-stepper">Previous</span>
        </Link>
      )}

      {pagesArr.map((i, index) => (
        <Link class={`font-11 ptb5 prl10 ${currentPage === i ? `pagination-box-current` : `pagination-box`}`} key={i} href={`${path}${i}/`}>
          {i}
        </Link>
      ))}
      {currentPage !== totalPages && (
        <Link class="mtba" href={`${path}${currentPage + 1}`}>
          <span class="pagination-stepper">Next</span>
        </Link>
      )}
    </div>
  )
})
