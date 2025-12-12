import { postApi } from "@/entities/posts/api/postApi"
import { TPost } from "@/entities/posts/model/types"
import { queryKeys } from "@/shared/lib/queryKeys"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export const usePostList = (limit: number, skip: number, tag?: string, searchQuery?: string) => {
  const queryClient = useQueryClient()

  const { data, isLoading, refetch } = useQuery({
    queryKey: [...queryKeys.posts.list({ limit, skip, tag }), searchQuery],
    queryFn: async () => {
      // 검색어가 있으면 검색 API 사용
      if (searchQuery?.trim()) {
        return postApi.searchPosts(searchQuery)
      }
      // 태그가 있으면 태그별 조회
      if (tag && tag !== "all") {
        return postApi.getPostsByTag(tag)
      }
      // 기본 페이지네이션 조회
      return postApi.getPosts(limit, skip)
    },
  })

  // 낙관적 삭제 (캐시에서 즉시 제거)
  const removePost = (postId: number) => {
    queryClient.setQueryData(
      [...queryKeys.posts.list({ limit, skip, tag }), searchQuery],
      (old: { posts: TPost[]; total: number } | undefined) =>
        old && {
          ...old,
          posts: old.posts.filter((p) => p.id !== postId),
          total: old.total - 1,
        },
    )
  }

  return {
    posts: data?.posts ?? [],
    total: data?.total ?? 0,
    loading: isLoading,
    refetch,
    removePost,
  }
}
