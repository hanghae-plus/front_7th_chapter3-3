import { apiClient } from "../../../shared/api/base"
import { UserResponse, UsersResponse } from "../model/types"

export const getUsers = async () => {
  const response = await apiClient.get<UsersResponse>("/users", {
    limit: 0,
    select: "username,image",
  })
  return response
}

export const getUser = async (id: number) => {
  const response = await apiClient.get<UserResponse>(`/users/${id}`)
  return response
}
