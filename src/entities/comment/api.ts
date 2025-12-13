import { apiClient } from "@/shared/api"
import { Comment, NewComment, CommentsResponse } from "./types"

export const commentApi = {
  async getComments(postId: number): Promise<Comment[]> {
    const data = await apiClient<CommentsResponse>(`/comments/post/${postId}`)
    return data.comments
  },

  async addComment(comment: NewComment): Promise<Comment> {
    return apiClient<Comment>("/comments/add", {
      method: "POST",
      body: JSON.stringify(comment),
    })
  },

  async updateComment(id: number, body: string): Promise<Comment> {
    return apiClient<Comment>(`/comments/${id}`, {
      method: "PUT",
      body: JSON.stringify({ body }),
    })
  },

  async deleteComment(id: number): Promise<void> {
    await apiClient(`/comments/${id}`, { method: "DELETE" })
  },

  async likeComment(id: number, currentLikes: number): Promise<Comment> {
    return apiClient<Comment>(`/comments/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ likes: currentLikes + 1 }),
    })
  },
}
