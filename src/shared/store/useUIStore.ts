import { create } from "zustand"
import { devtools } from "zustand/middleware"
import type { Post } from "@/entities/post"
import type { Comment } from "@/entities/comment"

interface UIState {
  // Dialog states
  showAddPostDialog: boolean
  showEditPostDialog: boolean
  showPostDetailDialog: boolean
  showAddCommentDialog: boolean
  showEditCommentDialog: boolean
  showUserModal: boolean

  // Selected items
  selectedPost: Post | null
  selectedComment: Comment | null
  selectedUserId: number | null

  // Actions - Post dialogs
  openAddPostDialog: () => void
  closeAddPostDialog: () => void
  openEditPostDialog: (post: Post) => void
  closeEditPostDialog: () => void
  openPostDetail: (post: Post) => void
  closePostDetail: () => void

  // Actions - Comment dialogs
  openAddCommentDialog: () => void
  closeAddCommentDialog: () => void
  openEditCommentDialog: (comment: Comment) => void
  closeEditCommentDialog: () => void

  // Actions - User modal
  openUserModal: (userId: number) => void
  closeUserModal: () => void

  // Reset all
  closeAll: () => void
}

export const useUIStore = create<UIState>()(
  devtools(
    (set) => ({
      // Initial state
      showAddPostDialog: false,
      showEditPostDialog: false,
      showPostDetailDialog: false,
      showAddCommentDialog: false,
      showEditCommentDialog: false,
      showUserModal: false,
      selectedPost: null,
      selectedComment: null,
      selectedUserId: null,

      // Post dialog actions
      openAddPostDialog: () => set({ showAddPostDialog: true }),
      closeAddPostDialog: () => set({ showAddPostDialog: false }),
      openEditPostDialog: (post) => set({ showEditPostDialog: true, selectedPost: post }),
      closeEditPostDialog: () => set({ showEditPostDialog: false, selectedPost: null }),
      openPostDetail: (post) => set({ showPostDetailDialog: true, selectedPost: post }),
      closePostDetail: () => set({ showPostDetailDialog: false, selectedPost: null }),

      // Comment dialog actions
      openAddCommentDialog: () => set({ showAddCommentDialog: true }),
      closeAddCommentDialog: () => set({ showAddCommentDialog: false }),
      openEditCommentDialog: (comment) => set({ showEditCommentDialog: true, selectedComment: comment }),
      closeEditCommentDialog: () => set({ showEditCommentDialog: false, selectedComment: null }),

      // User modal actions
      openUserModal: (userId) => set({ showUserModal: true, selectedUserId: userId }),
      closeUserModal: () => set({ showUserModal: false, selectedUserId: null }),

      // Reset all
      closeAll: () =>
        set({
          showAddPostDialog: false,
          showEditPostDialog: false,
          showPostDetailDialog: false,
          showAddCommentDialog: false,
          showEditCommentDialog: false,
          showUserModal: false,
          selectedPost: null,
          selectedComment: null,
          selectedUserId: null,
        }),
    }),
    { name: "ui-store" },
  ),
)
