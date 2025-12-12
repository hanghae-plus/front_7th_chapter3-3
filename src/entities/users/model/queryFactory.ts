import { queryOptions } from "@tanstack/react-query"
import { fetchUsers, fetchUserById } from "../api"

export const userQueries = {
  all: () => ["users"],

  lists: () => [...userQueries.all(), "list"],

  details: () => [...userQueries.all(), "detail"],

  list: (limit: number, filters: string) =>
    queryOptions({
      queryKey: [...userQueries.lists(), limit, filters],
      queryFn: () => fetchUsers(limit, filters),
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: [...userQueries.details(), id],
      queryFn: () => fetchUserById(id),
      enabled: id > 0,
    }),
}
