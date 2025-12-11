import { useState, useCallback } from "react"
import { fetchComments } from "@/entities/comment/api/fetch-comments"
import { Comment } from "@/entities/comment/model/comment"

export const useComments = () => {
  const [comments, setComments] = useState<Record<number, Comment[]>>({})

  const loadComments = useCallback(async (postId: number) => {
    try {
      const data = await fetchComments(postId)
      setComments((prev) => ({
        ...prev,
        [postId]: data,
      }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }, [])

  const addCommentToState = useCallback((postId: number, comment: Comment) => {
    setComments((prev) => ({
      ...prev,
      [postId]: [comment, ...(prev[postId] || [])],
    }))
  }, [])

  const updateCommentInState = useCallback((postId: number, commentId: number, updatedComment: Comment) => {
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId]?.map((comment) => (comment.id === commentId ? updatedComment : comment)) || [],
    }))
  }, [])

  const removeCommentFromState = useCallback((postId: number, commentId: number) => {
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId]?.filter((comment) => comment.id !== commentId) || [],
    }))
  }, [])

  const likeCommentInState = useCallback((postId: number, commentId: number) => {
    setComments((prev) => ({
      ...prev,
      [postId]:
        prev[postId]?.map((comment) =>
          comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment,
        ) || [],
    }))
  }, [])

  return {
    comments,
    loadComments,
    addCommentToState,
    updateCommentInState,
    removeCommentFromState,
    likeCommentInState,
  }
}
