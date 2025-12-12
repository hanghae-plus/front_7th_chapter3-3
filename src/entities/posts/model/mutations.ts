import { useMutation, useQueryClient, QueryClient } from "@tanstack/react-query"
import { createPost, updatePost, deletePost } from "../api"
import { postQueries } from "./queryFactory"
import { Post } from "../types"

type MutationCallbacks<TData = unknown, TError = Error, TVariables = void> = {
  onSuccess?: (data: TData, variables: TVariables, context: unknown) => void
  onError?: (error: TError, variables: TVariables, context: unknown) => void
}

const invalidatePostQueries = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: postQueries.lists() })
  queryClient.invalidateQueries({ queryKey: postQueries.searches() })
  queryClient.invalidateQueries({ queryKey: postQueries.byTagList() })
}

export const useCreatePostMutation = (
  callbacks?: MutationCallbacks<Awaited<ReturnType<typeof createPost>>, Error, Parameters<typeof createPost>[0]>,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createPost,
    onSuccess: (data, variables, context) => {
      invalidatePostQueries(queryClient)
      callbacks?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      callbacks?.onError?.(error, variables, context)
    },
  })
}

export const useUpdatePostMutation = (
  callbacks?: MutationCallbacks<Awaited<ReturnType<typeof updatePost>>, Error, { id: number; post: Partial<Post> }>,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, post }: { id: number; post: Partial<Post> }) => updatePost(id, post),
    onSuccess: (data, variables, context) => {
      invalidatePostQueries(queryClient)
      callbacks?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      callbacks?.onError?.(error, variables, context)
    },
  })
}

export const useDeletePostMutation = (
  callbacks?: MutationCallbacks<Awaited<ReturnType<typeof deletePost>>, Error, number>,
) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePost,
    onSuccess: (data, variables, context) => {
      invalidatePostQueries(queryClient)
      callbacks?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      callbacks?.onError?.(error, variables, context)
    },
  })
}
