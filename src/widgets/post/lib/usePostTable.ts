import { useQuery, useQueryClient } from "@tanstack/react-query"
import { PostsParams } from "../../../entities/post/model/types"
import { postWithAuthorQueries } from "../../../features/post/api/queries"
import { useQueryParams } from "../../../shared/lib/useQueryParams"

export const usePostTable = () => {
  const queryClient = useQueryClient()
  const { getQueryParam } = useQueryParams()

  const tag = getQueryParam("tag")
  const limit = getQueryParam("limit")
  const skip = getQueryParam("skip")
  const sortBy = getQueryParam("sortBy")
  const order = getQueryParam("order")
  const search = getQueryParam("search")

  const params: PostsParams = { tag, limit, skip, sortBy, order, search }
  const { data: cachedData, isLoading, error, refetch } = useQuery(postWithAuthorQueries.list(queryClient, params))

  return {
    data: cachedData?.data || [],
    total: cachedData?.total || 0,
    isLoading,
    error,
    refetch,
    search,
  }
}
