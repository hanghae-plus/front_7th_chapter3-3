import { useQuery } from "@tanstack/react-query"
import getPostsApi from "../api/getPostsApi"
import { PostParams } from "./post"

export const POST_QUERY_KEY = "posts"

interface UsePostsQueryParams {
  params: PostParams
  enabled?: boolean
}

const usePostsQuery = ({ params, enabled = true }: UsePostsQueryParams) => {
  return useQuery({
    queryKey: [POST_QUERY_KEY, params],
    queryFn: () => getPostsApi({ limit: params.limit, skip: params.skip }),
    enabled,
  })
}

export default usePostsQuery
