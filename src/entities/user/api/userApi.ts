import { User, UserBasic } from "../model/types"

interface UsersResponse {
  users: UserBasic[]
  total: number
  skip: number
  limit: number
}

export const userApi = {
  // 사용자 목록 가져오기 (username, image만)
  getUsers: async (): Promise<UsersResponse | undefined> => {
    try {
      const response = await fetch("/api/users?limit=0&select=username,image")
      return await response.json()
    } catch (error) {
      console.error("사용자 목록 가져오기 오류:", error)
    }
  },

  // 사용자 상세 정보 가져오기
  getUserById: async (id: number): Promise<User | undefined> => {
    try {
      const response = await fetch(`/api/users/${id}`)
      return await response.json()
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  },
}

