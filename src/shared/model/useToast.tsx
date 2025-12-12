import { create } from "zustand"

interface ToastState {
  toasts: Array<{ id: string; message: string; type?: "error" | "success" | "info" }>
  showToast: (message: string, type?: "error" | "success" | "info") => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  showToast: (message, type = "error") => {
    const id = Date.now().toString()
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }))
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) }))
  },
}))
