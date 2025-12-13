import { create } from "zustand"
import { Comment, NewComment } from "./types"
import { commentApi } from "../api/commentApi"

interface CommentState {
  // 상태: postId를 key로 하는 댓글 맵
  commentsByPostId: Record<number, Comment[]>

  // 액션
  fetchComments: (postId: number) => Promise<void>
  addComment: (newComment: NewComment) => Promise<Comment | undefined>
  updateComment: (id: number, postId: number, body: string) => Promise<Comment | undefined>
  deleteComment: (id: number, postId: number) => Promise<void>
  likeComment: (id: number, postId: number) => Promise<void>
}

export const useCommentStore = create<CommentState>((set, get) => ({
  commentsByPostId: {},

  // 댓글 가져오기
  fetchComments: async (postId) => {
    const { commentsByPostId } = get()
    // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    if (commentsByPostId[postId]) return

    const data = await commentApi.getCommentsByPostId(postId)
    if (data?.comments) {
      set((state) => ({
        commentsByPostId: {
          ...state.commentsByPostId,
          [postId]: data.comments,
        },
      }))
    }
  },

  // 댓글 추가
  addComment: async (newComment) => {
    const data = await commentApi.addComment(newComment)
    if (data) {
      set((state) => ({
        commentsByPostId: {
          ...state.commentsByPostId,
          [data.postId]: [...(state.commentsByPostId[data.postId] || []), data],
        },
      }))
    }
    return data
  },

  // 댓글 수정
  updateComment: async (id, postId, body) => {
    const data = await commentApi.updateComment(id, body)
    if (data) {
      set((state) => ({
        commentsByPostId: {
          ...state.commentsByPostId,
          [postId]: state.commentsByPostId[postId].map((comment) =>
            comment.id === id ? { ...comment, body: data.body } : comment
          ),
        },
      }))
    }
    return data
  },

  // 댓글 삭제
  deleteComment: async (id, postId) => {
    await commentApi.deleteComment(id)
    set((state) => ({
      commentsByPostId: {
        ...state.commentsByPostId,
        [postId]: state.commentsByPostId[postId].filter((comment) => comment.id !== id),
      },
    }))
  },

  // 댓글 좋아요
  likeComment: async (id, postId) => {
    const { commentsByPostId } = get()
    const comment = commentsByPostId[postId]?.find((c) => c.id === id)
    if (!comment) return

    const data = await commentApi.likeComment(id, comment.likes)
    if (data) {
      set((state) => ({
        commentsByPostId: {
          ...state.commentsByPostId,
          [postId]: state.commentsByPostId[postId].map((c) =>
            c.id === id ? { ...c, likes: c.likes + 1 } : c
          ),
        },
      }))
    }
  },
}))

