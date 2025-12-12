import { create } from "zustand"

interface DetailPostDialogStore {
  showDialog: boolean
  openDetailPostDialog: () => void
  closeDetailPostDialog: () => void
  setShowDialog: (show: boolean) => void
}

export const useDetailPostDialogStore = create<DetailPostDialogStore>((set) => ({
  showDialog: false,
  openDetailPostDialog: () => set({ showDialog: true }),
  closeDetailPostDialog: () => set({ showDialog: false }),
  setShowDialog: (show: boolean) => set({ showDialog: show }),
}))

