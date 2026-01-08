/**
 * UI 전역 상태 관리 Store
 * 
 * 다이얼로그, 모달 등 UI 상태 관리
 * @see mockdowns/PLANS/state-management-plan.md - 상태 관리 계획 참고
 */

import { create } from "zustand"

// UI Store 상태 인터페이스
export interface UIState {
  // 다이얼로그 상태
  showAddDialog: boolean
  showEditDialog: boolean
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  showPostDetailDialog: boolean
  showUserModal: boolean
  
  // 액션
  setShowAddDialog: (show: boolean) => void
  setShowEditDialog: (show: boolean) => void
  setShowAddCommentDialog: (show: boolean) => void
  setShowEditCommentDialog: (show: boolean) => void
  setShowPostDetailDialog: (show: boolean) => void
  setShowUserModal: (show: boolean) => void
  reset: () => void
}

// 초기 상태
const initialState = {
  showAddDialog: false,
  showEditDialog: false,
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  showPostDetailDialog: false,
  showUserModal: false,
}

// UI Store 생성
export const useUIStore = create<UIState>((set) => ({
  ...initialState,
  
  setShowAddDialog: (show: boolean) => {
    set({ showAddDialog: show })
  },
  
  setShowEditDialog: (show: boolean) => {
    set({ showEditDialog: show })
  },
  
  setShowAddCommentDialog: (show: boolean) => {
    set({ showAddCommentDialog: show })
  },
  
  setShowEditCommentDialog: (show: boolean) => {
    set({ showEditCommentDialog: show })
  },
  
  setShowPostDetailDialog: (show: boolean) => {
    set({ showPostDetailDialog: show })
  },
  
  setShowUserModal: (show: boolean) => {
    set({ showUserModal: show })
  },
  
  // 상태 초기화
  reset: () => {
    set(initialState)
  },
}))

