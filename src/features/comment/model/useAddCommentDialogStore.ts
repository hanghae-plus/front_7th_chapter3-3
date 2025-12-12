import { create } from "zustand"

interface AddCommentDialogStore {
  showDialog: boolean
  openAddCommentDialog: () => void
  closeAddCommentDialog: () => void
  setShowDialog: (show: boolean) => void
}

export const useAddCommentDialogStore = create<AddCommentDialogStore>((set) => ({
  showDialog: false,
  openAddCommentDialog: () => set({ showDialog: true }),
  closeAddCommentDialog: () => set({ showDialog: false }),
  setShowDialog: (show: boolean) => set({ showDialog: show }),
}))
