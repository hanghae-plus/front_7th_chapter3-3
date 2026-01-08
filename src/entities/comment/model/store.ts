/**
 * Comment 엔티티 Zustand Store
 *
 * 댓글 관련 전역 상태 관리
 * @see mockdowns/PLANS/state-management-plan.md - 상태 관리 계획 참고
 */

import { create } from "zustand"
import type { Comment } from "./types"
import {
  fetchComments as fetchCommentsAPI,
  addComment as addCommentAPI,
  updateComment as updateCommentAPI,
  deleteComment as deleteCommentAPI,
} from "../api"

// Comment Store 상태 인터페이스
export interface CommentState {
  // 댓글 상태 (게시물 ID별로 관리)
  comments: Record<number, Comment[]>
  selectedComment: Comment | null
  newComment: { body: string; postId: number | null; userId: number }
  loading: boolean
  error: string | null

  // 액션
  fetchComments: (postId: number) => Promise<void>
  addComment: (comment: { body: string; postId: number; userId: number }) => Promise<void>
  updateComment: (id: number, comment: { body: string }) => Promise<void>
  deleteComment: (id: number, postId: number) => Promise<void>
  setSelectedComment: (comment: Comment | null) => void
  setNewComment: (comment: { body: string; postId: number | null; userId: number }) => void
  setComments: (comments: Record<number, Comment[]>) => void
  reset: () => void
}

// 초기 상태
const initialState = {
  comments: {},
  selectedComment: null,
  newComment: { body: "", postId: null, userId: 1 },
  loading: false,
  error: null,
}

// Comment Store 생성
export const useCommentStore = create<CommentState>((set, get) => ({
  ...initialState,

  // 댓글 목록 조회
  fetchComments: async (postId: number) => {
    // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    if (get().comments[postId]) return

    set({ loading: true, error: null })
    try {
      const response = await fetchCommentsAPI(postId)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: response.comments,
        },
        loading: false,
        error: null,
      }))
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "댓글 조회 실패",
      })
    }
  },

  // 댓글 추가
  addComment: async (comment: { body: string; postId: number; userId: number }) => {
    set({ loading: true, error: null })
    try {
      const newComment = await addCommentAPI(comment)
      set((state) => ({
        comments: {
          ...state.comments,
          [newComment.postId]: [...(state.comments[newComment.postId] || []), newComment],
        },
        newComment: { body: "", postId: null, userId: 1 },
        loading: false,
        error: null,
      }))
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "댓글 추가 실패",
      })
      throw error
    }
  },

  // 댓글 수정
  updateComment: async (id: number, comment: { body: string }) => {
    set({ loading: true, error: null })
    try {
      const updatedComment = await updateCommentAPI(id, comment)
      set((state) => ({
        comments: {
          ...state.comments,
          [updatedComment.postId]: state.comments[updatedComment.postId].map((c) => (c.id === id ? updatedComment : c)),
        },
        loading: false,
        error: null,
      }))
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "댓글 수정 실패",
      })
      throw error
    }
  },

  // 댓글 삭제
  deleteComment: async (id: number, postId: number) => {
    set({ loading: true, error: null })
    try {
      await deleteCommentAPI(id)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: state.comments[postId].filter((c) => c.id !== id),
        },
        loading: false,
        error: null,
      }))
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "댓글 삭제 실패",
      })
      throw error
    }
  },

  // 선택된 댓글 설정
  setSelectedComment: (comment: Comment | null) => {
    set({ selectedComment: comment })
  },

  // 새 댓글 작성 상태 설정
  setNewComment: (comment: { body: string; postId: number | null; userId: number }) => {
    set({ newComment: comment })
  },

  // 댓글 목록 설정
  setComments: (comments: Record<number, Comment[]>) => {
    set({ comments })
  },

  // 상태 초기화
  reset: () => {
    set(initialState)
  },
}))
