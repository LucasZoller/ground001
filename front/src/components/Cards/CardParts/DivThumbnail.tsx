import { component$ } from "@builder.io/qwik"

type ThumbSet = { thumbSet: { avif: string[]; jpeg: string[] } }

export const DivThumbnail = component$(({ thumbSet }: ThumbSet) => {
  return (
    <>
      <picture>
        <source
          srcset={`
            ${thumbSet.avif[0]} 320w,
            ${thumbSet.avif[1]} 480w,
            ${thumbSet.avif[2]} 768w`}
          sizes="(max-width: 768px) 320px, (max-width: 1200px) 480px, 768px"
          type="image/avif"
        />

        <source
          srcset={`
            ${thumbSet.jpeg[0]} 320w,
            ${thumbSet.jpeg[1]} 480w,
            ${thumbSet.jpeg[2]} 768w`}
          sizes="(max-width: 768px) 320w, (max-width: 1200px) 480w, 768w"
          type="image/jpeg"
        />

        <img width="768" height="431" style={{ maxWidth: "100%", height: "auto" }} src={thumbSet.jpeg[2]} alt="Testing thumbnail sizes!" />
      </picture>
    </>
  )
})
