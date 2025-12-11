import { create } from 'zustand'
import { commentApi, type CreateCommentDto, type UpdateCommentDto, type CommentsResponse } from '../api'
import type { Comment } from './types'

interface CommentStore {
  // 상태 (postId별로 댓글 관리)
  comments: Record<number, Comment[]> // { [postId]: Comment[] }
  loading: boolean
  error: string | null

  // API 호출 + 상태 관리 함수들 (순수 Comment 도메인만)
  fetchCommentsByPost: (postId: number) => Promise<CommentsResponse>
  createComment: (comment: CreateCommentDto) => Promise<Comment>
  updateComment: (id: number, comment: UpdateCommentDto) => Promise<Comment>
  deleteComment: (id: number, postId: number) => Promise<void>
  likeComment: (id: number, postId: number, currentLikes: number) => Promise<Comment>
  
  // 상태 조작 함수들
  setComments: (postId: number, comments: Comment[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearError: () => void
  reset: () => void
}

const initialState = {
  comments: {} as Record<number, Comment[]>,
  loading: false,
  error: null,
}

export const useCommentStore = create<CommentStore>((set) => ({
  ...initialState,

  // 게시물별 댓글 조회 (순수 Comment API만 호출)
  fetchCommentsByPost: async (postId: number) => {
    set({ loading: true, error: null })

    try {
      const response = await commentApi.getCommentsByPost(postId)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: response.comments,
        },
        loading: false,
      }))
      return response
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '댓글을 불러오는데 실패했습니다',
        loading: false,
      })
      throw error
    }
  },

  // 댓글 생성 (순수 Comment API만 호출)
  createComment: async (comment: CreateCommentDto) => {
    set({ loading: true, error: null })
    try {
      const createdComment = await commentApi.createComment(comment)
      set((state) => ({
        comments: {
          ...state.comments,
          [comment.postId]: [
            ...(state.comments[comment.postId] || []),
            createdComment,
          ],
        },
        loading: false,
      }))
      return createdComment
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '댓글 생성에 실패했습니다',
        loading: false,
      })
      throw error
    }
  },

  // 댓글 수정 (순수 Comment API만 호출)
  updateComment: async (id: number, comment: UpdateCommentDto) => {
    set({ loading: true, error: null })
    try {
      const updatedComment = await commentApi.updateComment(id, comment)
      
      // postId를 찾아서 업데이트
      set((state) => {
        const newComments = { ...state.comments }
        for (const postId in newComments) {
          const index = newComments[postId].findIndex((c) => c.id === id)
          if (index !== -1) {
            newComments[postId] = [
              ...newComments[postId].slice(0, index),
              updatedComment,
              ...newComments[postId].slice(index + 1),
            ]
            break
          }
        }
        return { comments: newComments, loading: false }
      })
      
      return updatedComment
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '댓글 수정에 실패했습니다',
        loading: false,
      })
      throw error
    }
  },

  // 댓글 삭제 (순수 Comment API만 호출)
  deleteComment: async (id: number, postId: number) => {
    set({ loading: true, error: null })
    try {
      await commentApi.deleteComment(id)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: (state.comments[postId] || []).filter((c) => c.id !== id),
        },
        loading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '댓글 삭제에 실패했습니다',
        loading: false,
      })
      throw error
    }
  },

  // 댓글 좋아요 (순수 Comment API만 호출)
  likeComment: async (id: number, postId: number, currentLikes: number) => {
    set({ loading: true, error: null })
    try {
      const updatedComment = await commentApi.likeComment(id, currentLikes + 1)
      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: (state.comments[postId] || []).map((c) =>
            c.id === id ? { ...updatedComment, likes: currentLikes + 1 } : c
          ),
        },
        loading: false,
      }))
      return updatedComment
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '댓글 좋아요에 실패했습니다',
        loading: false,
      })
      throw error
    }
  },

  // 상태 조작 함수들
  setComments: (postId: number, comments: Comment[]) =>
    set((state) => ({
      comments: { ...state.comments, [postId]: comments },
    })),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  clearError: () => set({ error: null }),
  reset: () => set(initialState),
}))

