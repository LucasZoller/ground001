import { component$ } from "@builder.io/qwik"
import { Link, useLocation } from "@builder.io/qwik-city"

export const Breadcrumbs = component$(() => {
  const { url } = useLocation()
  const urlArray = url.pathname.split("/")
  return (
    <>
      {/* Hide breadcrumbs on the account top*/}
      {urlArray.length > 3 && (
        <div class="bg-gray-700 flex h25px pl5">
          <span class="font-9 mtba">
            <span class="pr5">
              <Link href={`/${urlArray[1]}`}>{urlArray[1]}</Link>
            </span>
            <span class="pr5"> &gt; </span>
            <span class="mtba">
              <Link href={`/${urlArray[1]}/${urlArray[2]}`}>{urlArray[2]}</Link>
            </span>
          </span>
        </div>
      )}
    </>
  )
})
