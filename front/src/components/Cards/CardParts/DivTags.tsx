import { component$ } from "@builder.io/qwik"

type DivTagsProps = { tags: string[] }

export const DivTags = component$(({ tags }: DivTagsProps) => {
  return (
    <>
      {tags.map(singleTag => (
        <div class="box-turquoise" key={singleTag}>
          <span>{singleTag}</span>
        </div>
      ))}
    </>
  )
})
