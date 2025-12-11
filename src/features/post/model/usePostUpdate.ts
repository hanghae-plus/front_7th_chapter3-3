import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postApi, type UpdatePostDto, type Post } from '../../../entities/post/api'
import { postKeys } from '../../../shared/lib'

/**
 * 게시물 수정 기능
 * 낙관적 업데이트를 적용합니다.
 */
export const usePostUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, post }: { id: number; post: UpdatePostDto }) =>
      postApi.updatePost(id, post),
    // 낙관적 업데이트: 서버 응답 전에 UI 업데이트
    onMutate: async ({ id, post }) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: postKeys.detail(id) })
      await queryClient.cancelQueries({ queryKey: postKeys.all() })

      // 이전 데이터 백업
      const previousPost = queryClient.getQueryData<Post>(postKeys.detail(id))
      const previousPosts = queryClient.getQueriesData({ queryKey: postKeys.all() })

      // 낙관적 업데이트: 즉시 UI 업데이트
      if (previousPost) {
        queryClient.setQueryData<Post>(postKeys.detail(id), {
          ...previousPost,
          ...post,
        })
      }

      // 목록도 업데이트
      queryClient.setQueriesData<{ posts: Post[] }>(
        { queryKey: postKeys.all() },
        (old) => {
          if (!old) return old
          return {
            ...old,
            posts: old.posts.map((p) => (p.id === id ? { ...p, ...post } : p)),
          }
        }
      )

      return { previousPost, previousPosts }
    },
    // 에러 발생 시 롤백
    onError: (error, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(postKeys.detail(variables.id), context.previousPost)
      }
      if (context?.previousPosts) {
        context.previousPosts.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      console.error('게시물 수정 오류:', error)
    },
    // 성공 시 쿼리 무효화
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all() })
    },
  })
}
