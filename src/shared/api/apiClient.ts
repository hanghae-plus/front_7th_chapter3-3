// API Base URL 설정
// 개발 환경 (localhost): proxy를 통해 /api 경로 사용
// 프로덕션 환경: 직접 dummyjson.com 호출
const isDevelopment = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
const API_BASE_URL = isDevelopment ? "/api" : "https://dummyjson.com"

export const getApiUrl = (path: string): string => {
  return `${API_BASE_URL}${path}`
}
