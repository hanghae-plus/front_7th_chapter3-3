import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { commentApi } from './commentApi'
import { CreateCommentDto, UpdateCommentDto } from '../model/types'
import { showErrorToast } from '@/shared/lib/errorHandler'

export const commentKeys = {
  all: ['comments'] as const,
  byPost: (postId: number) => [...commentKeys.all, 'post', postId] as const,
}

export const useComments = (postId: number, enabled = true) => {
  return useQuery({
    queryKey: commentKeys.byPost(postId),
    queryFn: () => commentApi.getCommentsByPostId(postId),
    enabled,
  })
}

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: CreateCommentDto) => commentApi.createComment(dto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.byPost(data.postId) })
    },
    onError: (error) => {
      showErrorToast(error)
    },
  })
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dto: UpdateCommentDto & { postId: number }) => commentApi.updateComment(dto),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.byPost(variables.postId) })
    },
    onError: (error) => {
      showErrorToast(error)
    },
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: number; postId: number }) => commentApi.deleteComment(id),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.byPost(variables.postId) })
    },
    onError: (error) => {
      showErrorToast(error)
    },
  })
}

export const useLikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, postId, currentLikes }: { id: number; postId: number; currentLikes: number }) =>
      commentApi.likeComment(id, postId, currentLikes),
    onMutate: async ({ id, postId, currentLikes }) => {
      await queryClient.cancelQueries({ queryKey: commentKeys.byPost(postId) })

      const previousComments = queryClient.getQueryData(commentKeys.byPost(postId))

      queryClient.setQueryData(commentKeys.byPost(postId), (old: any) => {
        if (!old) return old
        return {
          ...old,
          comments: old.comments.map((comment: any) =>
            comment.id === id ? { ...comment, likes: currentLikes + 1 } : comment
          ),
        }
      })

      return { previousComments }
    },
    onError: (_err, variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(commentKeys.byPost(variables.postId), context.previousComments)
      }
    },
    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({ queryKey: commentKeys.byPost(variables.postId) })
    },
  })
}
