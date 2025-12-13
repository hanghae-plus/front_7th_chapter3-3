import { StateCreator } from "zustand"
import { Post } from "@/entities/post/model/post"

export interface PostDialogSlice {
  showAddDialog: boolean
  showEditDialog: boolean
  showPostDetailDialog: boolean
  selectedPost: Post | null
  setShowAddDialog: (show: boolean) => void
  setShowEditDialog: (show: boolean) => void
  setShowPostDetailDialog: (show: boolean) => void
  setSelectedPost: (post: Post | null) => void
}

export const createPostDialogSlice: StateCreator<PostDialogSlice> = (set) => ({
  showAddDialog: false,
  showEditDialog: false,
  showPostDetailDialog: false,
  selectedPost: null,
  setShowAddDialog: (show) => set({ showAddDialog: show }),
  setShowEditDialog: (show) => set({ showEditDialog: show }),
  setShowPostDetailDialog: (show) => set({ showPostDetailDialog: show }),
  setSelectedPost: (post) => set({ selectedPost: post }),
})
