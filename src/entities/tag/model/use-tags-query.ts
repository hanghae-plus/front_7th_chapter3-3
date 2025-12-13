import { useQuery } from "@tanstack/react-query"
import { fetchTags } from "../api/fetch-tags"
import { Tag } from "./tag"

export const TAGS_QUERY_KEY = ["tags"] as const

export const useTagsQuery = () => {
  return useQuery<Tag[]>({
    queryKey: TAGS_QUERY_KEY,
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 10, // 10분 (태그는 자주 변하지 않으므로)
  })
}
