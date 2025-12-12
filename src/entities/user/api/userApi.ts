import { User, UsersResponse } from "../model/types"
import { API_BASE_URL } from "@/shared/config/api"

export const fetchUsers = async (params?: { limit?: number; select?: string }): Promise<UsersResponse> => {
  const queryParams = new URLSearchParams()
  if (params?.limit !== undefined) queryParams.set("limit", params.limit.toString())
  if (params?.select) queryParams.set("select", params.select)

  const response = await fetch(`${API_BASE_URL}/users?${queryParams.toString()}`)
  return response.json()
}

export const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/users/${id}`)
  return response.json()
}
