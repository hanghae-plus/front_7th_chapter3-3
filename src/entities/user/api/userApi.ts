import type { User } from '../model/types'
import { API_BASE_URL } from '../../../shared/config'

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

export interface UserSelectFields {
  username?: boolean
  image?: boolean
  // 필요한 필드만 선택
}

export const userApi = {
  // 사용자 목록 조회
  getUsers: async (params?: {
    limit?: number
    skip?: number
    select?: string
  }): Promise<UsersResponse> => {
    const queryParams = new URLSearchParams()
    if (params?.limit !== undefined) queryParams.set('limit', params.limit.toString())
    if (params?.skip !== undefined) queryParams.set('skip', params.skip.toString())
    if (params?.select) queryParams.set('select', params.select)

    const response = await fetch(`${API_BASE_URL}/users?${queryParams.toString()}`)
    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }
    return response.json()
  },

  // 사용자 단건 조회
  getUser: async (id: number): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${id}`)
    }
    return response.json()
  },
}
