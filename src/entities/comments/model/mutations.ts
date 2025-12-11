import { useMutation, useQueryClient, QueryClient } from "@tanstack/react-query"
import { createComment, updateComment, deleteComment, likeComment } from "../api"
import { commentQueries } from "./queryFactory"
import { Comment } from "../types"

type MutationCallbacks<TData = unknown, TError = Error, TVariables = void> = {
  onSuccess?: (data: TData, variables: TVariables, context: unknown) => void
  onError?: (error: TError, variables: TVariables, context: unknown) => void
}

const invalidateCommentQueries = (queryClient: QueryClient, postId: number) => {
  queryClient.invalidateQueries({ queryKey: [...commentQueries.lists(), postId] })
}

export const useCreateCommentMutation = (
  postId: number,
  callbacks?: MutationCallbacks<
    Awaited<ReturnType<typeof createComment>>,
    Error,
    Comment | { body: string; postId: number; userId: number }
  >,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createComment,
    onSuccess: (data, variables, context) => {
      const targetPostId = postId || (data as Comment)?.postId || (variables as { postId?: number })?.postId
      if (targetPostId) {
        invalidateCommentQueries(queryClient, targetPostId)
      }
      callbacks?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      callbacks?.onError?.(error, variables, context)
    },
  })
}

export const useUpdateCommentMutation = (
  postId: number,
  callbacks?: MutationCallbacks<Awaited<ReturnType<typeof updateComment>>, Error, { id: number; body: string }>,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: string }) => updateComment(id, body),
    onSuccess: (data, variables, context) => {
      if (postId) {
        invalidateCommentQueries(queryClient, postId)
      }
      callbacks?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      callbacks?.onError?.(error, variables, context)
    },
  })
}

export const useDeleteCommentMutation = (
  postId: number,
  callbacks?: MutationCallbacks<Awaited<ReturnType<typeof deleteComment>>, Error, number>,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (data, variables, context) => {
      if (postId) {
        invalidateCommentQueries(queryClient, postId)
      }
      callbacks?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      callbacks?.onError?.(error, variables, context)
    },
  })
}

export const useLikeCommentMutation = (
  postId: number,
  callbacks?: MutationCallbacks<Awaited<ReturnType<typeof likeComment>>, Error, { id: number; likes: number }>,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => likeComment(id, likes),
    onSuccess: (data, variables, context) => {
      if (postId) {
        invalidateCommentQueries(queryClient, postId)
      }
      callbacks?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      callbacks?.onError?.(error, variables, context)
    },
  })
}
