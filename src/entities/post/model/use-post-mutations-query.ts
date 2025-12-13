import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Post } from "./post"
import { addPost } from "../api/add-post"
import { updatePost } from "../api/update-post"
import { deletePost } from "../api/delete-post"
import { POSTS_QUERY_KEY } from "./use-posts-query"

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newPost: Partial<Post>) => addPost(newPost),
    onSuccess: () => {
      // 게시물 목록 무효화하여 재조회
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
  })
}

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (post: Post) => updatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
  })
}

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
  })
}
