import { create } from 'zustand'
import { userApi } from '../api'
import type { User } from './types'

interface UserStore {
  // 상태
  selectedUser: User | null
  loading: boolean
  error: string | null

  // API 호출 + 상태 관리 함수들 (순수 User 도메인만)
  fetchUser: (id: number) => Promise<User>
  
  // 상태 조작 함수들
  setSelectedUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  reset: () => void
}

const initialState = {
  selectedUser: null,
  loading: false,
  error: null,
}

export const useUserStore = create<UserStore>((set) => ({
  ...initialState,

  // 사용자 단건 조회 (순수 User API만 호출)
  fetchUser: async (id: number) => {
    set({ loading: true, error: null })
    try {
      const user = await userApi.getUser(id)
      set({ selectedUser: user, loading: false })
      return user
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '사용자 정보를 불러오는데 실패했습니다',
        loading: false,
      })
      throw error
    }
  },

  // 상태 조작 함수들
  setSelectedUser: (user: User | null) => set({ selectedUser: user }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
  reset: () => set(initialState),
}))

