import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "@/shared/api"
import { userApi } from "./userApi"

export function useUser(userId: number) {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => userApi.getById(userId),
    enabled: !!userId,
  })
}

export function useUsers() {
  return useQuery({
    queryKey: queryKeys.users.all,
    queryFn: () => userApi.getAll({ limit: 0, select: "username,image" }),
  })
}
