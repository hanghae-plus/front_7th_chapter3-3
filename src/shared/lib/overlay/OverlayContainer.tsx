import { Fragment } from "react"
import { useOverlay } from "./useOverlay"

export const OverlayContainer = () => {
  const { overlays } = useOverlay()

  return (
    <>
      {overlays.map((overlay) => (
        <Fragment key={overlay.id}>{overlay.component}</Fragment>
      ))}
    </>
  )
}
