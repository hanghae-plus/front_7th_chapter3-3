import { X } from "lucide-react"
import { useEffect } from "react"
import { Button } from "./Button"

interface ToastProps {
  message: string
  type?: "error" | "success" | "info"
  onClose: () => void
  duration?: number
}

export const Toast = ({ message, type = "error", onClose, duration = 5000 }: ToastProps) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const bgColor = {
    error: "bg-red-500",
    success: "bg-green-500",
    info: "bg-blue-500",
  }[type]

  return (
    <div
      className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-4 min-w-[300px] max-w-[500px] z-50`}
    >
      <p className="flex-1">{message}</p>
      <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 p-0 h-auto">
        <X className="w-4 h-4" />
      </Button>
    </div>
  )
}
