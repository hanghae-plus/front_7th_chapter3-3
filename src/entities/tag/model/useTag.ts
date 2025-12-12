import { useQuery } from "@tanstack/react-query"
import { tagApi } from "../api"

export const TAG_QUERY_KEY = "tags"

export const useQueryTags = () => {
  return useQuery({
    queryKey: [TAG_QUERY_KEY],
    queryFn: () => tagApi.getTags(),
  })
}
