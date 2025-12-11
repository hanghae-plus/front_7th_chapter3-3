import { Comment, CommentsResponse, NewComment } from "../model"

export const commentsApi = {
  // 게시물의 댓글 목록 조회
  getCommentsByPost: async (postId: number): Promise<CommentsResponse> => {
    const response = await fetch(`/api/comments/post/${postId}`)
    return response.json()
  },

  // 댓글 추가
  addComment: async (comment: NewComment): Promise<Comment> => {
    const response = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
    return response.json()
  },

  // 댓글 수정
  updateComment: async (id: number, body: string): Promise<Comment> => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    })
    return response.json()
  },

  // 댓글 삭제
  deleteComment: async (id: number): Promise<void> => {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
  },

  // 댓글 좋아요
  likeComment: async (id: number, likes: number): Promise<Comment> => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes }),
    })
    return response.json()
  },
}
