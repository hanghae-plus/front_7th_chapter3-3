import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api"
import { tagApi } from "./tagApi"

export function useTags() {
  return useQuery({
    queryKey: queryKeys.tags.all,
    queryFn: tagApi.getAll,
  })
}
