import { useQuery } from "@tanstack/react-query"
import { fetchTags } from "../api"

export const tagKeys = {
  all: ["tags"] as const,
}

export const useTagsQuery = () => {
  return useQuery({
    queryKey: tagKeys.all,
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
  })
}
