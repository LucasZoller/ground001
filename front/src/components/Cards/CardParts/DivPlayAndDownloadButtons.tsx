import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"

export const DivPlayAndDownloadButtons = component$((props: { streamingPath: string; downloadPath: string }) => {
  return (
    <div class="flex">
      <Link href={props.streamingPath} class="mini-button-dolphin w150px ma">
        Play
      </Link>
      <Link href={props.downloadPath} class="mini-button-magenta w150px ma">
        Download
      </Link>
    </div>
  )
})
