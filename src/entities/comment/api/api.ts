import { apiClient } from "../../../shared/api/base"
import { Comment, CommentRequestBody, CommentResponse, CommentsResponse } from "../model/types"

export const getComments = async (id: number) => {
  const response = await apiClient.get<CommentsResponse>(`/comments/post/${id}`)
  return response
}

export const postComment = async (body: CommentRequestBody) => {
  const response = await apiClient.post<CommentResponse>("/comments/add", body)
  return response
}

export const putComment = async (comment: Comment) => {
  const response = await apiClient.put<Comment>(`/comments/${comment.id}`, {
    body: comment.body,
  })
  return response
}

export const patchComment = async (comment: Comment) => {
  const response = await apiClient.patch<Comment>(`/comments/${comment.id}`, {
    body: comment.body,
  })
  return response
}

export const deleteComment = async (id: number) => {
  const response = await apiClient.delete<Comment>(`/comments/${id}`)
  return response
}
