import { component$ } from "@builder.io/qwik"
import { useAuth } from "../../hooks/useAuth"

export default component$(() => {
  console.log("🎏🎏🎏Hey from protected-test index!")
  let message = "I am the default one🧵🧵🧵"

  const { userState, sessionState } = useAuth("/user-area-test")

  return (
    <>
      <div>
        <div>${message}</div>
        <div>{`userState.created_at : ${userState.created_at}`}</div>
        <div>{`userState.email : ${userState.email}`}</div>
        <div>{`userState.hashed_rt : ${userState.hashed_rt}`}</div>
        <div>{`userState.lang : ${userState.lang}`}</div>
        <div>{`userState.last_modified_at : ${userState.last_modified_at}`}</div>
        <div>{`userState.message : ${userState.message}`}</div>
        <div>{`userState.status : ${userState.status}`}</div>
        <div>{`userState.user_code : ${userState.user_code}`}</div>
        <div>{`userState.user_name : ${userState.user_name}`}</div>
        <div>{`This is the atExp from the sessionState.atExp : ${sessionState.atExp}`}</div>
      </div>
    </>
  )
})
