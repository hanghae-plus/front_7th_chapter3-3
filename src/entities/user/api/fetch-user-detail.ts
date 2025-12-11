import { UserDetail } from "../model/user"

export const fetchUserDetail = async (userId: number): Promise<UserDetail> => {
  const response = await fetch(`/api/users/${userId}`)
  return response.json()
}
