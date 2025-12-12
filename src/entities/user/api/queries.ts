import { queryOptions } from "@tanstack/react-query"
import { getUser, getUsers } from "./api"

export const userQueries = {
  all: ["users"] as const,
  list: () =>
    queryOptions({
      queryKey: [...userQueries.all],
      queryFn: getUsers,
    }),
  detail: (id: number | null) =>
    queryOptions({
      queryKey: [...userQueries.all, id],
      queryFn: () => {
        if (id === null) throw new Error("User ID is required")
        return getUser(id)
      },
      enabled: id !== null,
    }),
}
