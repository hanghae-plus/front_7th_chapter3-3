import { useQuery } from "@tanstack/react-query"
import { fetchUsers } from "../api/fetch-users"
import { User } from "./user"

export const USERS_QUERY_KEY = ["users"] as const

export const useUsersQuery = () => {
  return useQuery<{ users: User[] }>({
    queryKey: USERS_QUERY_KEY,
    queryFn: () => fetchUsers({ limit: 0, select: ["username", "image"] }),
    staleTime: 1000 * 60 * 10, // 10분
  })
}
