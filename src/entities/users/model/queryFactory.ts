import { queryOptions } from "@tanstack/react-query"
import { fetchUsers, fetchUserById } from "../api"

export const userQueries = {
  all: () => ["users"],

  lists: () => [...userQueries.all(), "list"],

  details: () => [...userQueries.all(), "detail"],

  list: (filters: string) =>
    queryOptions({
      queryKey: [...userQueries.lists(), filters],
      queryFn: () => fetchUsers(),
    }),

  detail: (id: number) =>
    queryOptions({
      queryKey: [...userQueries.details(), id],
      queryFn: () => fetchUserById(id),
    }),
}
