import { useState } from "react"
import { Post } from "@/entities/post/model/post"
import { addPost } from "@/entities/post/api/add-post"
import { updatePost as updatePostApi } from "@/entities/post/api/update-post"
import { deletePost as deletePostApi } from "@/entities/post/api/delete-post"

interface UsePostMutationsOptions {
  onSuccess?: (message: string, data?: Post) => void
  onError?: (error: unknown) => void
}

export const usePostMutations = (defaultOptions?: UsePostMutationsOptions) => {
  const [loading, setLoading] = useState(false)

  const handleSuccess = (message: string, options?: UsePostMutationsOptions, data?: Post) => {
    const onSuccess = options?.onSuccess || defaultOptions?.onSuccess
    onSuccess?.(message, data)
  }

  const handleError = (error: unknown, options?: UsePostMutationsOptions) => {
    console.error(error)
    const onError = options?.onError || defaultOptions?.onError
    onError?.(error)
  }

  const createPost = async (newPost: Partial<Post>, options?: UsePostMutationsOptions) => {
    setLoading(true)
    try {
      const createdPost = await addPost(newPost)
      handleSuccess("게시글이 추가되었습니다.", options, createdPost)
    } catch (error) {
      handleError(error, options)
    } finally {
      setLoading(false)
    }
  }

  const updatePost = async (post: Post, options?: UsePostMutationsOptions) => {
    setLoading(true)
    try {
      await updatePostApi(post)
      handleSuccess("게시글이 수정되었습니다.", options)
    } catch (error) {
      handleError(error, options)
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (id: number, options?: UsePostMutationsOptions) => {
    setLoading(true)
    try {
      await deletePostApi(id)
      handleSuccess("게시글이 삭제되었습니다.", options)
    } catch (error) {
      handleError(error, options)
    } finally {
      setLoading(false)
    }
  }

  return { createPost, updatePost, deletePost, loading }
}
