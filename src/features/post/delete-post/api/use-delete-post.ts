import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as postApi from "@/entities/post/api/postApi"
import { postQueries } from "@/entities/post/queries"
import type { Post } from "@/entities/post/model/types"

/**
 * 게시물 삭제 기능 (낙관적 업데이트 적용)
 *
 * FSD 공식 가이드:
 * "기능 근처 커스텀 훅에서 useMutation 로직과 queryClient 갱신을 함께 정의"
 *
 * 동작 방식:
 * 1. onMutate: 즉시 UI에서 게시물 제거
 * 2. onError: 에러 발생 시 이전 상태로 롤백
 * 3. onSettled: 서버 데이터로 최종 동기화
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postApi.deletePost,

    // 낙관적 업데이트: 요청 전 즉시 UI에서 제거
    onMutate: async (postId) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: postQueries.lists() })

      // 현재 캐시된 모든 게시물 목록 데이터 저장 (롤백용)
      const previousPosts = queryClient.getQueriesData({ queryKey: postQueries.lists() })

      // 모든 게시물 목록 캐시에서 해당 게시물을 즉시 제거
      queryClient.setQueriesData({ queryKey: postQueries.lists() }, (old: any) => {
        if (!old?.posts) return old

        return {
          ...old,
          posts: old.posts.filter((p: Post) => p.id !== postId),
          total: old.total - 1,
        }
      })

      return { previousPosts }
    },

    // 에러 발생 시: 이전 상태로 롤백
    onError: (err, _variables, context) => {
      if (context?.previousPosts) {
        context.previousPosts.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
      console.error("게시물 삭제 실패:", err)
    },

    // 완료 시: 서버 데이터로 최종 동기화
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: postQueries.lists() })
    // },
  })
}
