import { create } from "zustand"

interface AddPostDialogStore {
  showDialog: boolean
  setShowDialog: (show: boolean) => void
}

export const useAddPostDialogStore = create<AddPostDialogStore>((set) => ({
  showDialog: false,
  setShowDialog: (show: boolean) => set({ showDialog: show }),
}))
