// 개발 환경: Vite proxy 사용 (/api)
// 프로덕션 환경: 직접 DummyJSON API 호출
export const API_BASE_URL = import.meta.env.DEV ? "/api" : "https://dummyjson.com"
