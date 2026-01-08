/**
 * User 엔티티 Zustand Store
 * 
 * 사용자 관련 전역 상태 관리
 * @see mockdowns/PLANS/state-management-plan.md - 상태 관리 계획 참고
 */

import { create } from "zustand"
import type { User, FetchUsersParams } from "./types"
import { fetchUsers as fetchUsersAPI, fetchUserById as fetchUserByIdAPI } from "../api"

// User Store 상태 인터페이스
export interface UserState {
  // 사용자 상태
  users: User[]
  selectedUser: User | null
  loading: boolean
  error: string | null
  
  // 액션
  fetchUsers: (params?: FetchUsersParams) => Promise<void>
  fetchUserById: (id: number) => Promise<void>
  setSelectedUser: (user: User | null) => void
  reset: () => void
}

// 초기 상태
const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
}

// User Store 생성
export const useUserStore = create<UserState>((set) => ({
  ...initialState,
  
  // 사용자 목록 조회
  fetchUsers: async (params?: FetchUsersParams) => {
    set({ loading: true, error: null })
    try {
      const response = await fetchUsersAPI(params)
      set({
        users: response.users,
        loading: false,
        error: null,
      })
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "사용자 조회 실패",
      })
    }
  },
  
  // 사용자 상세 조회
  fetchUserById: async (id: number) => {
    set({ loading: true, error: null })
    try {
      const user = await fetchUserByIdAPI(id)
      set({
        selectedUser: user,
        loading: false,
        error: null,
      })
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "사용자 조회 실패",
      })
    }
  },
  
  // 선택된 사용자 설정
  setSelectedUser: (user: User | null) => {
    set({ selectedUser: user })
  },
  
  // 상태 초기화
  reset: () => {
    set(initialState)
  },
}))

