import { useQuery } from "@tanstack/react-query"
import { commentQueries } from "../../../entities/comment/api/queries"
import { useQueryParams } from "../../../shared/lib/useQueryParams"

export const useCommentList = (postId: number) => {
  const { getQueryParam } = useQueryParams()
  const { data: comments, error, refetch } = useQuery(commentQueries.list(postId))
  const search = getQueryParam("search")

  return {
    comments: error ? [] : (comments?.comments ?? []),
    refetch,
    search,
  }
}
