import { QueryClient } from "@tanstack/react-query"

/**
 * TanStack Query v5 전역 QueryClient 인스턴스
 *
 * 기본 설정:
 * - staleTime: 60초 (데이터가 fresh 상태로 유지되는 시간)
 * - gcTime: 5분 (가비지 컬렉션 시간, 캐시 유지 시간)
 * - retry: 1회 (실패 시 재시도 횟수)
 * - refetchOnWindowFocus: false (윈도우 포커스 시 자동 refetch 비활성화)
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000, // 1분
      gcTime: 5 * 60_000, // 5분 (구 cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0, // mutation은 재시도 없음
    },
  },
})
