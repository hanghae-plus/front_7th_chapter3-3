import { create } from "zustand"

interface UiState {
  // Pagination
  skip: number
  limit: number
  searchQuery: string
  sortBy: string
  sortOrder: string

  // Dialogs
  showAddDialog: boolean
  showEditDialog: boolean
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  showPostDetailDialog: boolean
  showUserModal: boolean

  // Actions
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSearchQuery: (query: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: string) => void
  setShowAddDialog: (show: boolean) => void
  setShowEditDialog: (show: boolean) => void
  setShowAddCommentDialog: (show: boolean) => void
  setShowEditCommentDialog: (show: boolean) => void
  setShowPostDetailDialog: (show: boolean) => void
  setShowUserModal: (show: boolean) => void
}

export const useUiStore = create<UiState>((set) => ({
  // Pagination
  skip: 0,
  limit: 10,
  searchQuery: "",
  sortBy: "",
  sortOrder: "asc",

  // Dialogs
  showAddDialog: false,
  showEditDialog: false,
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  showPostDetailDialog: false,
  showUserModal: false,

  // Actions
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  setShowAddDialog: (showAddDialog) => set({ showAddDialog }),
  setShowEditDialog: (showEditDialog) => set({ showEditDialog }),
  setShowAddCommentDialog: (showAddCommentDialog) => set({ showAddCommentDialog }),
  setShowEditCommentDialog: (showEditCommentDialog) => set({ showEditCommentDialog }),
  setShowPostDetailDialog: (showPostDetailDialog) => set({ showPostDetailDialog }),
  setShowUserModal: (showUserModal) => set({ showUserModal }),
}))
