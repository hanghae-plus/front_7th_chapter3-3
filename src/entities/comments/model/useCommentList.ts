import { commentApi } from "@/entities/comments/api/commentApi"
import { queryKeys } from "@/shared/lib/queryKeys"
import { useQuery } from "@tanstack/react-query"

export const useCommentList = (postId: number) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: queryKeys.comments.byPost(postId),
    queryFn: () => commentApi.getCommentsByPostId(postId),
    enabled: !!postId,
  })

  return {
    comments: data?.comments ?? [],
    loading: isLoading,
    refetch,
  }
}
