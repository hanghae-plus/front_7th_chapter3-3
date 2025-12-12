import { create } from "zustand"

interface UserDialogStore {
  showUserDialog: boolean
  openUserDialog: () => void
  closeUserDialog: () => void
  setShowUserDialog: (show: boolean) => void
}

export const useUserDialogStore = create<UserDialogStore>((set) => ({
  showUserDialog: false,
  openUserDialog: () => set({ showUserDialog: true }),
  closeUserDialog: () => set({ showUserDialog: false }),
  setShowUserDialog: (show: boolean) => set({ showUserDialog: show }),
}))
