import { useQuery } from "@tanstack/react-query"
import getUsersApi from "../api/getUsersApi"

export const USERS_QUERY_KEY = "users"

const useUsersQuery = () => {
  return useQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: getUsersApi,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지 (User 데이터는 자주 변경되지 않음)
  })
}

export default useUsersQuery
