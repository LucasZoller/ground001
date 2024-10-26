import { component$, Slot } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"

type MiniButtonObj = {
  url?: string
  bg?: string
  w?: string
  h?: string
}

export const MiniButton = component$(({ obj }: { obj: MiniButtonObj }) => {
  return (
    <>
      <Link
        href={obj.url && obj.url}
        class={obj.bg && `bg-${obj.bg}`}
        style={{
          display: "block",
          width: `${obj.w}`,
          cursor: "pointer",
          color: "antiquewhite",
          fontSize: "0.8rem",
          padding: "3px 10px",
          borderRadius: "4px",
          textAlign: "center",
          transition: "background-color 190ms ease",
          border: obj.bg ? "none" : "1px solid antiquewhite",
          whiteSpace: "nowrap",
        }}>
        <div
          style={{
            height: obj.h ? `${obj.h}` : "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Slot />
        </div>
      </Link>
    </>
  )
})
