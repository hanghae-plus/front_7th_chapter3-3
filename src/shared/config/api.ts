/// <reference types="vite/client" />

// API 베이스 URL 설정
// 개발 환경: Vite 프록시를 통해 /api -> https://dummyjson.com
// 프로덕션 환경: 직접 https://dummyjson.com 호출
export const API_BASE_URL = import.meta.env.PROD ? "https://dummyjson.com" : "/api"
