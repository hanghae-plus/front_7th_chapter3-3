import { Post } from "@/entities/post/model/post"
import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "./use-post-mutations-query"

interface UsePostMutationsOptions {
  onSuccess?: (message: string, data?: Post) => void
  onError?: (error: unknown) => void
}

export const usePostMutations = (_defaultOptions?: UsePostMutationsOptions) => {
  const createMutation = useCreatePostMutation()
  const updateMutation = useUpdatePostMutation()
  const deleteMutation = useDeletePostMutation()

  const createPost = async (newPost: Partial<Post>, options?: UsePostMutationsOptions) => {
    try {
      const createdPost = await createMutation.mutateAsync(newPost)
      options?.onSuccess?.("게시글이 추가되었습니다.", createdPost)
    } catch (error) {
      console.error(error)
      options?.onError?.(error)
    }
  }

  const updatePost = async (post: Post, options?: UsePostMutationsOptions) => {
    try {
      await updateMutation.mutateAsync(post)
      options?.onSuccess?.("게시글이 수정되었습니다.")
    } catch (error) {
      console.error(error)
      options?.onError?.(error)
    }
  }

  const deletePost = async (id: number, options?: UsePostMutationsOptions) => {
    try {
      await deleteMutation.mutateAsync(id)
      options?.onSuccess?.("게시글이 삭제되었습니다.")
    } catch (error) {
      console.error(error)
      options?.onError?.(error)
    }
  }

  const loading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending

  return { createPost, updatePost, deletePost, loading }
}
