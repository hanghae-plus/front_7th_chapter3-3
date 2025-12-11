import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { getCommentsByPostId, addCommentApi, updateCommentApi, deleteCommentApi, likeCommentApi } from "../api"
import { Comment } from "@/entities/comment/model/types"

export const useCommentMutations = () => {
  // postId를 키로 하는 댓글 목록 상태 (기존 로직 유지)
  const [comments, setComments] = useState<Record<number, Comment[]>>({})

  // 1. 댓글 가져오기 (단순 호출)
  const fetchComments = async (postId: number) => {
    // 이미 불러온 적 있으면 스킵 (캐싱 효과)
    if (comments[postId]) return

    try {
      const data = await getCommentsByPostId(postId)
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 로딩 에러:", error)
    }
  }

  // 2. 추가 Mutation
  const addMutation = useMutation({
    mutationFn: addCommentApi,
    onSuccess: (newComment) => {
      setComments((prev) => ({
        ...prev,
        [newComment.postId]: [...(prev[newComment.postId] || []), newComment],
      }))
    },
  })

  // 3. 수정 Mutation
  const updateMutation = useMutation({
    mutationFn: updateCommentApi,
    onSuccess: (updatedComment) => {
      setComments((prev) => ({
        ...prev,
        [updatedComment.postId]: prev[updatedComment.postId].map((comment) =>
          comment.id === updatedComment.id ? updatedComment : comment,
        ),
      }))
    },
  })

  // 4. 삭제 Mutation
  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: number; postId: number }) => deleteCommentApi(id),
    onSuccess: (_, variables) => {
      setComments((prev) => ({
        ...prev,
        [variables.postId]: prev[variables.postId].filter((comment) => comment.id !== variables.id),
      }))
    },
  })

  // 5. 좋아요 Mutation
  const likeMutation = useMutation({
    mutationFn: ({ id, likes }: { id: number; postId: number; likes: number }) => likeCommentApi(id, likes),
    onSuccess: (updatedComment) => {
      setComments((prev) => ({
        ...prev,
        [updatedComment.postId]: prev[updatedComment.postId].map((comment) =>
          comment.id === updatedComment.id ? { ...updatedComment, likes: comment.likes + 1 } : comment,
        ),
      }))
    },
  })

  return {
    comments,
    fetchComments,
    addComment: addMutation.mutate,
    updateComment: updateMutation.mutate,
    deleteComment: (id: number, postId: number) => deleteMutation.mutate({ id, postId }),
    likeComment: (id: number, postId: number, likes: number) => likeMutation.mutate({ id, postId, likes }),
  }
}
