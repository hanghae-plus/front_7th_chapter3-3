/**
 * API 기본 URL 설정
 * - 개발환경: Vite 프록시 사용 (/api)
 * - 프로덕션: 직접 API 호출 (https://dummyjson.com)
 */
export const API_URL = import.meta.env.DEV ? "/api" : "https://dummyjson.com";
