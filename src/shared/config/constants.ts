/**
 * 공통 상수 정의
 */

export const PAGINATION = {
  DEFAULT_LIMIT: 10,
  DEFAULT_SKIP: 0,
  LIMIT_OPTIONS: [10, 20, 30] as const,
} as const

export const SORT = {
  DEFAULT_SORT_BY: 'none' as const,
  DEFAULT_SORT_ORDER: 'asc' as const,
} as const

/**
 * API Base URL
 * 개발 환경에서는 Vite 프록시를 사용하고, 프로덕션에서는 직접 API를 호출합니다.
 */
export const API_BASE_URL = import.meta.env.DEV ? '/api' : 'https://dummyjson.com'

