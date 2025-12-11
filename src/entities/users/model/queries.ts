import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { userQueries } from "./queryFactory"

export const useSuspenseUserList = (limit: number, filters: string) => {
  return useSuspenseQuery(userQueries.list(limit, filters))
}

export const useSuspenseUserDetail = (id: number) => {
  return useSuspenseQuery(userQueries.detail(id))
}

export const useUserList = (limit: number, filters: string) => {
  return useQuery(userQueries.list(limit, filters))
}

export const useUserDetail = (id: number) => {
  return useQuery({
    ...userQueries.detail(id),
    enabled: id > 0,
  })
}
