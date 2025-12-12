import { apiClient } from "@/shared/api"
import type { Comment, CommentsResponse, CreateCommentRequest, UpdateCommentRequest } from "../model/types"

export const commentApi = {
  getByPostId: (postId: number) => apiClient.get<CommentsResponse>(`/comments/post/${postId}`),

  create: (data: CreateCommentRequest) => apiClient.post<Comment>("/comments/add", data),

  update: (id: number, data: UpdateCommentRequest) => apiClient.put<Comment>(`/comments/${id}`, data),

  delete: (id: number) => apiClient.delete<Comment>(`/comments/${id}`),

  like: (id: number, likes: number) => apiClient.patch<Comment>(`/comments/${id}`, { likes }),
}
