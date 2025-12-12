import { useQuery } from "@tanstack/react-query"
import getCommentsApi from "../api/getCommentsApi"

export const COMMENTS_QUERY_KEY = "comments"

const useCommentsQuery = (postId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: [COMMENTS_QUERY_KEY, postId],
    queryFn: () => getCommentsApi({ postId }).then((res) => res.comments),
    enabled: enabled && !!postId,
  })
}

export default useCommentsQuery
