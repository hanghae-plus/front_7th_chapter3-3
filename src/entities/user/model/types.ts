export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  age: number
  image: string
  phone: string
  address: {
    address: string
    city: string
    state: string
  }
  company: {
    name: string
    title: string
    department: string
  }
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

export type UserSummary = Pick<User, "id" | "username" | "image">
