import { commentApi } from "@/entities/comments/api/commentApi"
import { TComment } from "@/entities/comments/model/types"
import { queryKeys } from "@/shared/lib/queryKeys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export const useAddComment = () => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [newComment, setNewComment] = useState({ body: "", postId: 0, userId: 1 })

  const mutation = useMutation({
    mutationFn: () => commentApi.createComment(newComment),
    onSuccess: (createdComment) => {
      // 해당 게시물의 댓글 캐시에 새 댓글 추가 (낙관적 업데이트)
      queryClient.setQueryData<{ comments: TComment[] }>(queryKeys.comments.byPost(newComment.postId), (old) => {
        if (!old) return { comments: [createdComment] }
        return {
          comments: [...old.comments, createdComment],
        }
      })
      setIsOpen(false)
      setNewComment({ body: "", postId: 0, userId: 1 })
    },
  })

  const openAddDialog = (postId: number) => {
    setNewComment((prev) => ({ ...prev, postId }))
    setIsOpen(true)
  }

  return {
    isOpen,
    setIsOpen,
    newComment,
    setNewComment,
    openAddDialog,
    handleSubmit: () => mutation.mutate(),
    isLoading: mutation.isPending,
  }
}
