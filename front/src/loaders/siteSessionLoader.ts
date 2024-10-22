import { routeLoader$ } from "@builder.io/qwik-city"

// eslint-disable-next-line qwik/loader-location
export const useSiteSessionLoader = routeLoader$(async ({ cookie }) => {
  const cltokenObj = cookie.get("cltoken")
  const siteSessionObj = cookie.get("site-session")
  if (cltokenObj && siteSessionObj) {
    return { cltoken: cltokenObj.value, siteSession: siteSessionObj.value }
  }
})
