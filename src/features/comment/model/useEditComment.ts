import { commentApi } from "@/entities/comments/api/commentApi"
import { TComment } from "@/entities/comments/model/types"
import { queryKeys } from "@/shared/lib/queryKeys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export const useEditComment = () => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedComment, setSelectedComment] = useState<TComment | null>(null)

  const mutation = useMutation({
    mutationFn: () => {
      if (!selectedComment) return Promise.reject(new Error("No comment selected"))
      return commentApi.updateComment(selectedComment.id, {
        body: selectedComment.body,
      })
    },
    onSuccess: (updatedComment) => {
      if (selectedComment) {
        // 해당 게시물의 댓글 캐시에서 수정된 댓글 업데이트 (낙관적 업데이트)
        queryClient.setQueryData<{ comments: TComment[] }>(queryKeys.comments.byPost(selectedComment.postId), (old) => {
          if (!old) return old
          return {
            comments: old.comments.map((c) => (c.id === selectedComment.id ? { ...c, ...updatedComment } : c)),
          }
        })
      }
      setIsOpen(false)
      setSelectedComment(null)
    },
  })

  const openEditDialog = (comment: TComment) => {
    setSelectedComment(comment)
    setIsOpen(true)
  }

  return {
    isOpen,
    setIsOpen,
    selectedComment,
    setSelectedComment,
    openEditDialog,
    handleSubmit: () => mutation.mutate(),
    isLoading: mutation.isPending,
  }
}
