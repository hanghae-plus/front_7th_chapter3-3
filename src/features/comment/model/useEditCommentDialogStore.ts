import { create } from "zustand"

interface EditCommentDialogStore {
  showDialog: boolean
  openEditCommentDialog: () => void
  closeEditCommentDialog: () => void
  setShowDialog: (show: boolean) => void
}

export const useEditCommentDialogStore = create<EditCommentDialogStore>((set) => ({
  showDialog: false,
  setShowDialog: (show: boolean) => set({ showDialog: show }),
  openEditCommentDialog: () => set({ showDialog: true }),
  closeEditCommentDialog: () => set({ showDialog: false }),
}))
