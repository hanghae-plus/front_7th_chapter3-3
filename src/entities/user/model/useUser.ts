import { useQuery } from "@tanstack/react-query"
import { userApi } from "../api"

export const USER_QUERY_KEY = "users"

export const useQueryUser = (id: number | null) => {
  return useQuery({
    queryKey: [USER_QUERY_KEY, id],
    queryFn: () => userApi.getUser(id!),
    enabled: !!id,
  })
}

export const useQueryUsers = () => {
  return useQuery({
    queryKey: [USER_QUERY_KEY, "all"],
    queryFn: () => userApi.getUsers(),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  })
}
