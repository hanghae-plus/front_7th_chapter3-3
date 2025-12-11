import { User, UsersResponse } from "../model"

export const usersApi = {
  getUsers: async (params?: { limit?: number; skip?: number; select?: string }): Promise<UsersResponse> => {
    const queryParams = new URLSearchParams()
    if (params?.limit !== undefined) queryParams.set("limit", params.limit.toString())
    if (params?.skip !== undefined) queryParams.set("skip", params.skip.toString())
    if (params?.select) queryParams.set("select", params.select)

    const response = await fetch(`/api/users?${queryParams}`)
    return response.json()
  },

  getUser: async (id: number): Promise<User> => {
    const response = await fetch(`/api/users/${id}`)
    return response.json()
  },
}
