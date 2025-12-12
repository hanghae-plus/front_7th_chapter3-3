import { apiClient } from '@/shared/api/client'
import { Comment, CommentsResponse, CreateCommentDto, UpdateCommentDto } from '../model/types'

export const commentApi = {
  getCommentsByPostId: async (postId: number) => {
    const response = await apiClient.get<CommentsResponse>(`/comments/post/${postId}`)
    return response.data
  },

  createComment: async (dto: CreateCommentDto) => {
    const response = await apiClient.post<Comment>('/comments/add', dto)
    return response.data
  },

  updateComment: async (dto: UpdateCommentDto) => {
    const { id, body } = dto
    const response = await apiClient.put<Comment>(`/comments/${id}`, { body })
    return response.data
  },

  deleteComment: async (id: number) => {
    const response = await apiClient.delete(`/comments/${id}`)
    return response.data
  },

  likeComment: async (id: number, _postId: number, currentLikes: number) => {
    const response = await apiClient.patch<Comment>(`/comments/${id}`, { likes: currentLikes + 1 })
    return response.data
  },
}
