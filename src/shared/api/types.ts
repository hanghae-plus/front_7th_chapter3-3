// 페이지네이션 응답 공통 타입
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  skip: number
  limit: number
}

// API 에러 타입
export interface ApiError {
  message: string
  status: number
}