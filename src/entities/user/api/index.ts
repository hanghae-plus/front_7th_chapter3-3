import { apiClient } from "@/shared/api/client"
import type { User } from "@/shared/types"

const API_BASE = "/api"

export const userApi = {
  async getUser(id: number): Promise<User> {
    return apiClient.get<User>(`${API_BASE}/users/${id}`)
  },
  async getUsers(): Promise<{ users: User[] }> {
    return apiClient.get<{ users: User[] }>(`${API_BASE}/users?limit=0&select=username,image`)
  },
}
