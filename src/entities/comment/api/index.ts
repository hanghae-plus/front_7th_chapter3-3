import { apiClient } from "@/shared/api/client"
import type { Comment, CommentsResponse, CreateCommentDto, UpdateCommentDto } from "@/shared/types"

const API_BASE = "/api"

export const commentApi = {
  async getComments(postId: number): Promise<CommentsResponse> {
    return apiClient.get<CommentsResponse>(`${API_BASE}/comments/post/${postId}`)
  },

  async createComment(data: CreateCommentDto): Promise<Comment> {
    return apiClient.post<Comment>(`${API_BASE}/comments/add`, data)
  },

  async updateComment(id: number, data: UpdateCommentDto): Promise<Comment> {
    return apiClient.put<Comment>(`${API_BASE}/comments/${id}`, data)
  },

  async deleteComment(id: number): Promise<void> {
    return apiClient.delete(`${API_BASE}/comments/${id}`)
  },

  async likeComment(id: number, likes: number): Promise<Comment> {
    return apiClient.patch<Comment>(`${API_BASE}/comments/${id}`, { likes: likes + 1 })
  },
}
