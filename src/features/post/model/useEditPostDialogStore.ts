import { create } from "zustand"

interface EditPostDialogStore {
  showDialog: boolean
  setShowDialog: (show: boolean) => void
}

export const useEditPostDialogStore = create<EditPostDialogStore>((set) => ({
  showDialog: false,
  setShowDialog: (show: boolean) => set({ showDialog: show }),
}))
