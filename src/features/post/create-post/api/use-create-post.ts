import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as postApi from "@/entities/post/api/postApi"
import { postQueries } from "@/entities/post/queries/postQueries"
import { PostsResponse } from "@/entities/post/model/types"

/**
 * 게시물 생성 기능
 *
 * 낙관적 업데이트 흐름:
 * 1. onMutate: 진행 중인 쿼리 취소 → 이전 데이터 스냅샷 저장 → 캐시에 새 게시물 추가
 * 2. onError: 스냅샷으로 롤백
 * 3. onSettled: 모든 list 쿼리 무효화하여 서버 데이터와 동기화
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postApi.createPost,

    onMutate: async (newPost) => {
      // 진행 중인 모든 posts list 쿼리 취소 (낙관적 업데이트가 덮어쓰지지 않도록)
      await queryClient.cancelQueries({ queryKey: postQueries.lists() })

      // 이전 쿼리 데이터들의 스냅샷 저장
      const previousQueries = queryClient.getQueriesData<PostsResponse>({
        queryKey: postQueries.lists(),
      })

      // 캐시에서 최대 ID 찾기 (252부터 시작)
      const allPostsData = queryClient.getQueriesData<PostsResponse>({
        queryKey: postQueries.lists(),
      })
      const maxId = allPostsData.reduce((max, [, data]) => {
        if (!data?.posts) return max
        const localMax = Math.max(...data.posts.map((p) => p.id))
        return Math.max(max, localMax)
      }, 251) // 기본값 251 (다음 ID는 252)

      // 모든 list 쿼리의 캐시를 낙관적으로 업데이트
      queryClient.setQueriesData<PostsResponse>({ queryKey: postQueries.lists() }, (old) => {
        if (!old) return old

        // 임시 ID로 새 게시물 생성 (서버에서 실제 ID를 받기 전)
        const optimisticPost = {
          id: maxId + 1, // 최대 ID + 1 (최소 252)
          title: newPost.title,
          body: newPost.body,
          userId: newPost.userId,
          tags: [],
          reactions: { likes: 0, dislikes: 0 },
        }

        return {
          ...old,
          posts: [optimisticPost, ...old.posts],
          total: old.total + 1,
        }
      })

      // 롤백을 위한 컨텍스트 반환
      return { previousQueries }
    },

    onError: (_error, _newPost, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousQueries) {
        context.previousQueries.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data)
        })
      }
    },

    // onSettled: () => {
    //   // 성공/실패 여부와 관계없이 모든 list 쿼리 무효화하여 서버 데이터와 동기화
    //   queryClient.invalidateQueries({ queryKey: postQueries.lists() })
    // },
  })
}
