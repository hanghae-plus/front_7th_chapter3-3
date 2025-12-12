import { QueryClient } from "@tanstack/react-query"
import { deleteComment, patchComment, postComment, putComment } from "../../../entities/comment/api/api"
import { commentQueries } from "../../../entities/comment/api/queries"
import { Comment, CommentRequestBody, CommentResponse } from "../../../entities/comment/model/types"
import { getErrorMessage } from "../../../shared/model/error"
import { useToastStore } from "../../../shared/model/useToast"

export const commentMutations = {
  add: (queryClient: QueryClient) => ({
    mutationFn: (body: CommentRequestBody) => postComment(body),
    onError: (error: unknown) => {
      const message = getErrorMessage(error)
      console.error("댓글 추가 실패:", message)
      useToastStore.getState().showToast(`댓글 추가에 실패했습니다: ${message}`, "error")
    },
    onSuccess: async (data: CommentResponse) => {
      const listQueryKey = commentQueries.list(data.postId).queryKey
      const listData = queryClient.getQueryData(listQueryKey)
      if (listData) {
        queryClient.setQueryData(listQueryKey, {
          ...listData,
          comments: [
            ...listData.comments,
            {
              ...data,
              likes: 0,
            },
          ],
          total: listData.total + 1,
        })
      }
    },
  }),
  update: (queryClient: QueryClient) => ({
    mutationFn: (comment: Comment) => putComment(comment),
    onSettled: async (_: Comment | undefined, _error: Error | null, data: Comment) => {
      try {
        const listQueryKey = commentQueries.list(data.postId).queryKey
        const listData = queryClient.getQueryData(listQueryKey)
        if (listData) {
          queryClient.setQueryData(listQueryKey, {
            ...listData,
            comments: listData.comments.map((comment) =>
              comment.id === data.id ? { ...data, likes: comment.likes } : comment,
            ),
          })
        }
      } catch (error) {
        const message = getErrorMessage(error)
        console.error("댓글 수정 실패:", message)
        useToastStore.getState().showToast(`댓글 수정에 실패했습니다: ${message}`, "error")
      }
    },
  }),
  delete: (queryClient: QueryClient) => ({
    mutationFn: ({ id }: { id: number; postId: number }) => deleteComment(id),
    onSettled: async (_: Comment | undefined, _error: Error | null, { id, postId }: { id: number; postId: number }) => {
      try {
        const listQueryKey = commentQueries.list(postId).queryKey
        const listData = queryClient.getQueryData(listQueryKey)
        if (listData) {
          queryClient.setQueryData(listQueryKey, {
            ...listData,
            comments: listData.comments.filter((comment) => comment.id !== id),
            total: listData.total - 1,
          })
        }
      } catch (error) {
        const message = getErrorMessage(error)
        console.error("댓글 삭제 실패:", message)
        useToastStore.getState().showToast(`댓글 삭제에 실패했습니다: ${message}`, "error")
      }
    },
  }),
  like: (queryClient: QueryClient) => ({
    mutationFn: (comment: Comment) => patchComment(comment),
    onSettled: async (_: Comment | undefined, _error: Error | null, data: Comment) => {
      try {
        const listQueryKey = commentQueries.list(data.postId).queryKey
        const listData = queryClient.getQueryData(listQueryKey)
        if (listData) {
          queryClient.setQueryData(listQueryKey, {
            ...listData,
            comments: listData.comments.map((comment) =>
              comment.id === data.id ? { ...comment, likes: comment.likes + 1 } : comment,
            ),
          })
        }
      } catch (error) {
        const message = getErrorMessage(error)
        console.error("댓글 좋아요 실패:", message)
        useToastStore.getState().showToast(`좋아요에 실패했습니다: ${message}`, "error")
      }
    },
  }),
}
