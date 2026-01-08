/**
 * User 엔티티 타입 정의
 * 
 * @see mockdowns/RULES/api-response-structure.md - API 응답 구조 참고
 */

// 주소 정보
export interface Address {
  address: string
  city: string
  state: string
  postalCode: string
  coordinates?: {
    lat: number
    lng: number
  }
}

// 회사 정보
export interface Company {
  name: string
  title: string
  department?: string
  address?: {
    address: string
    city: string
    state: string
    postalCode: string
  }
}

// 사용자 정보
export interface User {
  id: number
  username: string
  image: string
  email?: string
  firstName?: string
  lastName?: string
  age?: number
  gender?: string
  phone?: string
  address?: Address
  company?: Company
}

// API 응답 타입
export interface UserResponse {
  id: number
  username: string
  image: string
  email?: string
  firstName?: string
  lastName?: string
  age?: number
  gender?: string
  phone?: string
  address?: Address
  company?: Company
}

export interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

// DTO 타입
export interface CreateUserDto {
  username: string
  email?: string
  firstName?: string
  lastName?: string
  age?: number
  gender?: string
  phone?: string
}

export interface UpdateUserDto {
  username?: string
  email?: string
  firstName?: string
  lastName?: string
  age?: number
  gender?: string
  phone?: string
}

// Users API 파라미터
export interface FetchUsersParams {
  limit?: number
  skip?: number
  select?: string
}

