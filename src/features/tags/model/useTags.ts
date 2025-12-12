import { postApi } from "@/entities/posts/api/postApi"
import { queryKeys } from "@/shared/lib/queryKeys"
import { useQuery } from "@tanstack/react-query"

export type TTag = {
  slug: string
  name: string
  url: string
}

export const useTags = () => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.tags.all,
    queryFn: postApi.getTags,
    staleTime: 1000 * 60 * 10, // 태그는 10분간 fresh
  })

  return {
    tags: data ?? [],
    loading: isLoading,
  }
}
