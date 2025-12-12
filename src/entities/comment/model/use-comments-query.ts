import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Comment } from "./comment"
import { fetchComments } from "../api/fetch-comments"
import { addComment } from "../api/add-comment"
import { updateComment } from "../api/update-comment"
import { deleteComment } from "../api/delete-comment"
import { likeComment } from "../api/like-comment"

export const COMMENTS_QUERY_KEY = ["comments"] as const

export const useCommentsQuery = (postId: number | null, enabled = true) => {
  return useQuery<Comment[]>({
    queryKey: [...COMMENTS_QUERY_KEY, postId],
    queryFn: () => (postId ? fetchComments(postId) : Promise.resolve([])),
    enabled: enabled && postId !== null,
    staleTime: 1000 * 60 * 2, // 2분
  })
}

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: { postId: number; body: string; userId: number }) => addComment(params),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [...COMMENTS_QUERY_KEY, variables.postId] })
    },
  })
}

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: { id: number; body: string; postId: number }) =>
      updateComment(variables.id, variables.body),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [...COMMENTS_QUERY_KEY, variables.postId] })
    },
  })
}

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: { id: number; postId: number }) => deleteComment(variables.id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [...COMMENTS_QUERY_KEY, variables.postId] })
    },
  })
}

export const useLikeCommentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (variables: { id: number; postId: number }) => likeComment(variables.id),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [...COMMENTS_QUERY_KEY, variables.postId] })
    },
  })
}
