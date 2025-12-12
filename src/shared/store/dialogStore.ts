import { TPost } from "@/entities/posts/model/types"
import { create } from "zustand"

interface DialogState {
  // 게시물 상세 다이얼로그
  showDetailDialog: boolean
  selectedPost: TPost | null
  openDetailDialog: (post: TPost) => void
  closeDetailDialog: () => void

  // 게시물 수정 다이얼로그
  showEditDialog: boolean
  editingPost: TPost | null
  openEditDialog: (post: TPost) => void
  closeEditDialog: () => void
  setEditingPost: (post: TPost | null) => void

  // 게시물 추가 다이얼로그
  showAddDialog: boolean
  openAddDialog: () => void
  closeAddDialog: () => void
}

export const useDialogStore = create<DialogState>((set) => ({
  // 게시물 상세 다이얼로그
  showDetailDialog: false,
  selectedPost: null,
  openDetailDialog: (post) => set({ showDetailDialog: true, selectedPost: post }),
  closeDetailDialog: () => set({ showDetailDialog: false, selectedPost: null }),

  // 게시물 수정 다이얼로그
  showEditDialog: false,
  editingPost: null,
  openEditDialog: (post) => set({ showEditDialog: true, editingPost: post }),
  closeEditDialog: () => set({ showEditDialog: false, editingPost: null }),
  setEditingPost: (post) => set({ editingPost: post }),

  // 게시물 추가 다이얼로그
  showAddDialog: false,
  openAddDialog: () => set({ showAddDialog: true }),
  closeAddDialog: () => set({ showAddDialog: false }),
}))
