import { ReactNode } from "react"

export interface OverlayItem {
  id: string
  component: ReactNode
  isOpen: boolean
}

export interface OverlayController {
  isOpen: boolean
  close: () => void
}

export type OverlayComponent = (controller: OverlayController) => ReactNode

export interface OverlayContextValue {
  overlays: OverlayItem[]
  open: (component: OverlayComponent) => Promise<void>
  close: (id: string) => void
  closeAll: () => void
}
