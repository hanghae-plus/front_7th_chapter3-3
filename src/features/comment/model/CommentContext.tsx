import { createContext, ReactNode, useCallback, useState } from "react"
import type { Comment, NewComment } from "@/entities/comment"
import { commentsApi } from "@/entities/comment"

export interface CommentContextValue {
  // State
  comments: Record<number, Comment[]>
  selectedComment: Comment | null

  // Setters
  setComments: (comments: Record<number, Comment[]>) => void
  setSelectedComment: (comment: Comment | null) => void

  // Actions
  fetchCommentsByPost: (postId: number) => Promise<void>
  addComment: (newComment: NewComment) => Promise<Comment | undefined>
  editComment: (id: number, body: string) => Promise<Comment | undefined>
  deleteComment: (id: number, postId: number) => Promise<void>
  likeComment: (id: number, currentLikes: number) => Promise<Comment | undefined>
}

export const CommentContext = createContext<CommentContextValue | null>(null)

export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)

  // 댓글 가져오기
  const fetchCommentsByPost = useCallback(
    async (postId: number) => {
      if (comments[postId]) return
      try {
        const data = await commentsApi.getCommentsByPost(postId)
        setComments((prev) => ({ ...prev, [postId]: data.comments }))
      } catch (error) {
        console.error("댓글 가져오기 오류:", error)
      }
    },
    [comments],
  )

  // 댓글 추가
  const addComment = useCallback(async (newComment: NewComment) => {
    try {
      const data = await commentsApi.addComment(newComment)
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      return data
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }, [])

  // 댓글 수정
  const editComment = useCallback(async (id: number, body: string) => {
    try {
      const data = await commentsApi.updateComment(id, body)
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      return data
    } catch (error) {
      console.error("댓글 수정 오류:", error)
    }
  }, [])

  // 댓글 삭제
  const deleteComment = useCallback(async (id: number, postId: number) => {
    try {
      await commentsApi.deleteComment(id)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }, [])

  // 댓글 좋아요
  const likeComment = useCallback(async (id: number, currentLikes: number) => {
    try {
      const data = await commentsApi.likeComment(id, currentLikes + 1)
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      return data
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }, [])

  const value: CommentContextValue = {
    // State
    comments,
    selectedComment,

    // Setters
    setComments,
    setSelectedComment,

    // Actions
    fetchCommentsByPost,
    addComment,
    editComment,
    deleteComment,
    likeComment,
  }

  return <CommentContext value={value}>{children}</CommentContext>
}
