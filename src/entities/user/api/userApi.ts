import { apiClient } from "@/shared/api"
import type { User, UsersResponse } from "../model/types"

export const userApi = {
  getAll: (params?: { limit?: number; select?: string }) =>
    apiClient.get<UsersResponse>("/users", { params }),

  getById: (id: number) => apiClient.get<User>(`/users/${id}`),
}
