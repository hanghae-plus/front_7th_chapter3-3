import { create } from "zustand"
import { Comment, NewComment } from "../types"
import { commentApi } from "../api"

interface CommentState {
  comments: Record<number, Comment[]>
  selectedComment: Comment | null

  // Actions
  fetchComments: (postId: number) => Promise<void>
  addComment: (comment: NewComment) => Promise<void>
  updateComment: (id: number, body: string, postId: number) => Promise<void>
  deleteComment: (id: number, postId: number) => Promise<void>
  likeComment: (id: number, postId: number) => Promise<void>
  setSelectedComment: (comment: Comment | null) => void
}

export const useCommentStore = create<CommentState>((set, get) => ({
  comments: {},
  selectedComment: null,

  fetchComments: async (postId) => {
    if (get().comments[postId]) return
    try {
      const comments = await commentApi.getComments(postId)
      set((state) => ({
        comments: { ...state.comments, [postId]: comments },
      }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  },

  addComment: async (newComment) => {
    try {
      const comment = await commentApi.addComment(newComment)
      const postId = comment.postId
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: [...(state.comments[postId] || []), comment],
        },
      }))
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  },

  updateComment: async (id, body, postId) => {
    try {
      const updated = await commentApi.updateComment(id, body)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: (state.comments[postId] ?? []).map((c) =>
            c.id === id ? updated : c
          ),
        },
      }))
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  },

  deleteComment: async (id, postId) => {
    try {
      await commentApi.deleteComment(id)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: (state.comments[postId] ?? []).filter((c) => c.id !== id),
        },
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  },

  likeComment: async (id, postId) => {
    try {
      const comment = get().comments[postId]?.find((c) => c.id === id)
      if (!comment) return
      await commentApi.likeComment(id, comment.likes)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: (state.comments[postId] ?? []).map((c) =>
            c.id === id ? { ...c, likes: c.likes + 1 } : c
          ),
        },
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  },

  setSelectedComment: (comment) => set({ selectedComment: comment }),
}))
