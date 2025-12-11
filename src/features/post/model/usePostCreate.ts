import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postApi, type CreatePostDto } from '../../../entities/post/api'
import { postKeys } from '../../../shared/lib'

/**
 * 게시물 생성 기능
 */
export const usePostCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (post: CreatePostDto) => postApi.createPost(post),
    onSuccess: () => {
      // 게시물 목록 쿼리 무효화하여 자동 리프레시
      queryClient.invalidateQueries({ queryKey: postKeys.all() })
    },
    onError: (error) => {
      console.error('게시물 생성 오류:', error)
    },
  })
}
