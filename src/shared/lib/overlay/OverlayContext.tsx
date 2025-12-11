import { createContext, useState, useCallback, ReactNode } from "react"
import { OverlayContextValue, OverlayItem, OverlayComponent } from "./types"

export const OverlayContext = createContext<OverlayContextValue | null>(null)

let overlayId = 0

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [overlays, setOverlays] = useState<OverlayItem[]>([])

  const open = useCallback((component: OverlayComponent): Promise<void> => {
    return new Promise((resolve) => {
      const id = String(overlayId++)

      const close = () => {
        setOverlays((prev) => prev.map((overlay) => (overlay.id === id ? { ...overlay, isOpen: false } : overlay)))

        // 애니메이션을 위해 약간의 지연 후 제거
        setTimeout(() => {
          setOverlays((prev) => prev.filter((overlay) => overlay.id !== id))
          resolve()
        }, 200)
      }

      const overlayItem: OverlayItem = {
        id,
        component: component({ isOpen: true, close }),
        isOpen: true,
      }

      setOverlays((prev) => [...prev, overlayItem])
    })
  }, [])

  const close = useCallback((id: string) => {
    setOverlays((prev) => prev.map((overlay) => (overlay.id === id ? { ...overlay, isOpen: false } : overlay)))

    setTimeout(() => {
      setOverlays((prev) => prev.filter((overlay) => overlay.id !== id))
    }, 200)
  }, [])

  const closeAll = useCallback(() => {
    setOverlays((prev) => prev.map((overlay) => ({ ...overlay, isOpen: false })))

    setTimeout(() => {
      setOverlays([])
    }, 200)
  }, [])

  return (
    <OverlayContext.Provider value={{ overlays, open, close, closeAll }}>{children}</OverlayContext.Provider>
  )
}
