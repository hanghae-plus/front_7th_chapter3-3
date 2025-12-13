import { create } from "zustand"
import { User } from "./types"
import { userApi } from "../api/userApi"

interface UserState {
  // 상태
  selectedUser: User | null
  showUserModal: boolean

  // 액션
  setSelectedUser: (user: User | null) => void
  setShowUserModal: (show: boolean) => void
  openUserModal: (userId: number) => Promise<void>
  closeUserModal: () => void
}

export const useUserStore = create<UserState>((set) => ({
  selectedUser: null,
  showUserModal: false,

  setSelectedUser: (user) => set({ selectedUser: user }),
  setShowUserModal: (show) => set({ showUserModal: show }),

  openUserModal: async (userId) => {
    const userData = await userApi.getUserById(userId)
    if (userData) {
      set({ selectedUser: userData, showUserModal: true })
    }
  },

  closeUserModal: () => {
    set({ showUserModal: false, selectedUser: null })
  },
}))

