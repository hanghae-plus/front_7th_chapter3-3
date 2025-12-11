export interface User {
  id: number
  username: string
  image: string

  // 모달에서 보여줄 상세 정보들 (Optional로 처리하거나 다 정의)
  firstName?: string
  lastName?: string
  age?: number
  email?: string
  phone?: string
  address?: {
    address: string
    city: string
    state: string
  }
  company?: {
    name: string
    title: string
  }
}

export interface UserResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}
