import { component$, useSignal, useTask$ } from "@builder.io/qwik"
import wretch from "wretch"
import { BACKEND_URL } from "../../config"
import { routeLoader$ } from "@builder.io/qwik-city"
import { User } from "../types"

export const useReadUsers = routeLoader$(async () => {
  //This code runs only on the server, after every navigation
  //console.log will be printed in the server
  try {
    const data = await wretch(`${BACKEND_URL}/read_user_001`).get().json<User[]>()
    return data
  } catch (errDB) {
    console.error("Failed to get data", errDB)
    return []
  }
})

export const searchUsers = async (term: string) => {
  try {
    const data = await wretch(`${BACKEND_URL}/search_user_001`).post({ searchTerm: term }).json<User[]>()
    return data
  } catch (errDB) {
    console.error("Failed to get data", errDB)
    return []
  }
}

export default component$(() => {
  const usersData = useSignal<User[]>([])
  const initialUsers = useReadUsers()
  const searchTerm = useSignal("")

  useTask$(({ track }) => {
    const data = track(() => initialUsers.value)
    if (data) {
      usersData.value = data
    }
  })

  return (
    <>
      <div class="flex w100 p5 justify-around">
        <div class="flex gap5">
          <div class="mini-button-autumn flex">
            <span class="ma">Most Recent</span>
          </div>
          <div class="mini-button-autumn flex">
            <span class="ma">Oldest</span>
          </div>
          <div class="mini-button-strawberry flex">
            <span class="ma">Highest Sales</span>
          </div>
          <div class="mini-button-strawberry flex">
            <span class="ma">Most Purchases</span>
          </div>
          <div class="mini-button-orange flex">
            <span class="ma">10</span>
          </div>
          <div class="mini-button-orange flex">
            <span class="ma">20</span>
          </div>
          <div class="mini-button-orange flex">
            <span class="ma">30</span>
          </div>
          <div class="mini-button-orange flex">
            <span class="ma">40</span>
          </div>
          <div class="mini-button-orange flex">
            <span class="ma">50</span>
          </div>
          <div class="mini-button-orange flex">
            <span class="ma">75</span>
          </div>
          <div class="mini-button-orange flex">
            <span class="ma">100</span>
          </div>
          <div class="mini-button-dolphin flex">
            <span class="ma">not suspended</span>
          </div>
          <div class="mini-button-dolphin flex">
            <span class="ma">is suspended</span>
          </div>
        </div>
        <div class="flex gap5 w30">
          <input
            class="flex-grow-1 flex-shrink-1 p5"
            placeholder="user code, user name, or email"
            onInput$={async e => {
              searchTerm.value = (e.target as HTMLInputElement).value
              console.log(searchTerm.value)
            }}
          />
          <div class="mini-button-turquoise flex">
            <span
              class="ma"
              onClick$={async () => {
                usersData.value = await searchUsers(searchTerm.value)
                console.log("Search is pressed")
              }}
            >
              search
            </span>
          </div>
        </div>
      </div>

      <section class="section-full">
        {usersData.value.length > 0 && (
          <div>
            <div class="grid gap5 cms-10-column border-bottom-turquoise font8">
              <div class="ma">lang</div>
              <div class="ma">user code</div>
              <div class="ma">user name</div>
              <div class="ma">email</div>
              <div class="ma">owns</div>
              <div class="ma">sales</div>
              <div class="ma">created at</div>
              <div class="ma">suspended</div>
              <div class="ma">view</div>
              <div class="ma">edit</div>
            </div>
            {usersData.value.map(u => (
              <div class="grid gap5 cms-10-column border-bottom font8 ptb5" key={u.user_code}>
                <div class="ma">{u.lang}</div>
                <div class="ma">{u.user_code}</div>
                <div class="ma">{u.user_name}</div>
                <div class="ma">{u.email}</div>
                <div class="ma">155</div>
                <div class="ma">$15500</div>
                <div class="ma">{u.created_at.split("T")[0]}</div>
                <div class="ma">{u.suspended ? `suspended` : `active`}</div>
                <div class="ma">
                  <a href="/" class="mini-button-orange">
                    View
                  </a>
                </div>
                <div class="ma">
                  <a href={`/edit_vid/${u.user_code}`} class="mini-button-turquoise">
                    Go
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
})
