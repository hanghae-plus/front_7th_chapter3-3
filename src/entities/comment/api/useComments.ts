import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api"
import { commentApi } from "./commentApi"

export function useComments(postId: number) {
  return useQuery({
    queryKey: queryKeys.comments.byPost(postId),
    queryFn: () => commentApi.getByPostId(postId),
    enabled: !!postId,
  })
}
