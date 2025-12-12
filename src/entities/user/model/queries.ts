import { useQuery } from "@tanstack/react-query"
import { fetchUsers, fetchUserById } from "../api"

export const userKeys = {
  all: ["users"] as const,
  list: () => [...userKeys.all, "list"] as const,
  detail: (id: number) => [...userKeys.all, "detail", id] as const,
}

// 사용자 목록 조회
export const useUsersQuery = () => {
  return useQuery({
    queryKey: userKeys.list(),
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5, // 5분 동안 fresh 상태 유지
  })
}

// 사용자 상세 조회
export const useUserQuery = (userId: number) => {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => fetchUserById(userId),
    enabled: userId > 0,
  })
}
