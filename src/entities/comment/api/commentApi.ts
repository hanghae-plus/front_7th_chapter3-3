import type { Comment } from '../model/types'
import { API_BASE_URL } from '../../../shared/config'

export interface CreateCommentDto {
  body: string
  postId: number
  userId: number
}

export interface UpdateCommentDto {
  body?: string
}

export interface CommentsResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

export const commentApi = {
  // 댓글 목록 조회 (게시물별)
  getCommentsByPost: async (postId: number): Promise<CommentsResponse> => {
    const response = await fetch(`${API_BASE_URL}/comments/post/${postId}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch comments for post: ${postId}`)
    }
    return response.json()
  },

  // 댓글 단건 조회
  getComment: async (id: number): Promise<Comment> => {
    const response = await fetch(`${API_BASE_URL}/comments/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch comment: ${id}`)
    }
    return response.json()
  },

  // 댓글 생성
  createComment: async (comment: CreateCommentDto): Promise<Comment> => {
    const response = await fetch(`${API_BASE_URL}/comments/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
    if (!response.ok) {
      throw new Error('Failed to create comment')
    }
    return response.json()
  },

  // 댓글 수정
  updateComment: async (id: number, comment: UpdateCommentDto): Promise<Comment> => {
    const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
    if (!response.ok) {
      throw new Error(`Failed to update comment: ${id}`)
    }
    return response.json()
  },

  // 댓글 삭제
  deleteComment: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`Failed to delete comment: ${id}`)
    }
  },

  // 댓글 좋아요
  likeComment: async (id: number, likes: number): Promise<Comment> => {
    const response = await fetch(`${API_BASE_URL}/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
    if (!response.ok) {
      throw new Error(`Failed to like comment: ${id}`)
    }
    return response.json()
  },
}
