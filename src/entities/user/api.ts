import { apiClient } from "@/shared/api"
import { User } from "./types"

export const userApi = {
  async getUser(id: number): Promise<User> {
    return apiClient<User>(`/users/${id}`)
  },

  async getUsers(limit = 0, select?: string): Promise<User[]> {
    const data = await apiClient<{ users: User[] }>("/users", {
      params: { limit, ...(select && { select }) },
    })
    return data.users
  },
}
