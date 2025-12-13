import { create } from "zustand"
import { User } from "../types"
import { userApi } from "../api"

interface UserState {
  selectedUser: User | null
  loading: boolean

  // Actions
  fetchUser: (id: number) => Promise<void>
  setSelectedUser: (user: User | null) => void
}

export const useUserStore = create<UserState>((set) => ({
  selectedUser: null,
  loading: false,

  fetchUser: async (id) => {
    set({ loading: true, selectedUser: null })
    try {
      const user = await userApi.getUser(id)
      set({ selectedUser: user })
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
}))
