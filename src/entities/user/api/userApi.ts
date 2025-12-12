import { apiClient } from '@/shared/api/client'
import { User } from '../model/types'

export const userApi = {
  getUser: async (id: number) => {
    const response = await apiClient.get<User>(`/users/${id}`)
    return response.data
  },
}
