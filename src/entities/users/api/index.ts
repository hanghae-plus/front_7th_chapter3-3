import { User } from "../types"

export const fetchUsers = async (limit: number = 0, select?: string) => {
  const params = new URLSearchParams()
  if (limit >= 0) params.set("limit", limit.toString())
  if (select) params.set("select", select)
  const queryString = params.toString()
  const url = `/api/users${queryString ? `?${queryString}` : ""}`
  const response = await fetch(url)
  return response.json()
}

export const fetchUserById = async (userId: number): Promise<User> => {
  const response = await fetch(`/api/users/${userId}`)
  return response.json()
}
