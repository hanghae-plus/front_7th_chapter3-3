import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchComments, addComment, updateComment, deleteComment, likeComment } from "../api"

export const commentKeys = {
  all: ["comments"] as const,
  list: (postId: number) => [...commentKeys.all, "list", postId] as const,
}

// 댓글 목록 조회
export const useCommentsQuery = (postId: number) => {
  return useQuery({
    queryKey: commentKeys.list(postId),
    queryFn: () => fetchComments(postId),
    enabled: postId > 0,
  })
}

// 댓글 추가
export const useAddCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addComment,
    onSuccess: (newComment) => {
      // 캐시에 직접 새 댓글 추가
      queryClient.setQueryData(
        commentKeys.list(newComment.postId),
        (oldData: { comments: unknown[] } | undefined) => {
          if (!oldData) return { comments: [newComment] }
          return {
            ...oldData,
            comments: [...oldData.comments, newComment],
          }
        },
      )
    },
  })
}

// 댓글 수정
export const useUpdateCommentMutation = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (updatedComment) => {
      // 캐시에서 댓글 업데이트
      queryClient.setQueryData(
        commentKeys.list(postId),
        (oldData: { comments: { id: number }[] } | undefined) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            comments: oldData.comments.map((comment) =>
              comment.id === updatedComment.id ? updatedComment : comment,
            ),
          }
        },
      )
    },
  })
}

// 댓글 삭제
export const useDeleteCommentMutation = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, deletedId) => {
      // 캐시에서 댓글 제거
      queryClient.setQueryData(
        commentKeys.list(postId),
        (oldData: { comments: { id: number }[] } | undefined) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            comments: oldData.comments.filter((comment) => comment.id !== deletedId),
          }
        },
      )
    },
  })
}

// 댓글 좋아요 (낙관적 업데이트)
export const useLikeCommentMutation = (postId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => likeComment(id, likes),
    onMutate: async ({ id, likes }) => {
      await queryClient.cancelQueries({ queryKey: commentKeys.list(postId) })

      const previousData = queryClient.getQueryData(commentKeys.list(postId))

      // 즉시 좋아요 수 업데이트
      queryClient.setQueryData(
        commentKeys.list(postId),
        (oldData: { comments: { id: number; likes: number }[] } | undefined) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            comments: oldData.comments.map((comment) =>
              comment.id === id ? { ...comment, likes } : comment,
            ),
          }
        },
      )

      return { previousData }
    },
    onError: (_, __, context) => {
      // 실패시 롤백
      queryClient.setQueryData(commentKeys.list(postId), context?.previousData)
    },
  })
}
