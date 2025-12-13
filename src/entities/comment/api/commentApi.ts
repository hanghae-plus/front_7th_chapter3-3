import { NewComment } from "../model/types"

export const commentApi = {
  // 게시물별 댓글 가져오기
  getCommentsByPostId: async (postId: number) => {
    try {
      const response = await fetch(`/api/comments/post/${postId}`)
      return await response.json()
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  },

  // 댓글 추가
  addComment: async (newComment: NewComment) => {
    try {
      const response = await fetch("/api/comments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      })
      return await response.json()
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  },

  // 댓글 업데이트
  updateComment: async (id: number, body: string) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      })
      return await response.json()
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  },

  // 댓글 삭제
  deleteComment: async (id: number) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      })
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  },

  // 댓글 좋아요
  likeComment: async (id: number, currentLikes: number) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: currentLikes + 1 }),
      })
      return await response.json()
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  },
}

