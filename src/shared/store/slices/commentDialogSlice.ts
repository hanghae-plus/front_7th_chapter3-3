import { StateCreator } from "zustand"
import { Comment } from "@/entities/comment/model/comment"

export interface CommentDialogSlice {
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  selectedComment: Comment | null
  currentPostId: number | null
  setShowAddCommentDialog: (show: boolean) => void
  setShowEditCommentDialog: (show: boolean) => void
  setSelectedComment: (comment: Comment | null) => void
  setCurrentPostId: (id: number | null) => void
}

export const createCommentDialogSlice: StateCreator<CommentDialogSlice> = (set) => ({
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  selectedComment: null,
  currentPostId: null,
  setShowAddCommentDialog: (show) => set({ showAddCommentDialog: show }),
  setShowEditCommentDialog: (show) => set({ showEditCommentDialog: show }),
  setSelectedComment: (comment) => set({ selectedComment: comment }),
  setCurrentPostId: (id) => set({ currentPostId: id }),
})
