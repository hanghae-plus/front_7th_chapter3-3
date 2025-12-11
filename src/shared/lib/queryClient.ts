import { QueryClient } from '@tanstack/react-query'

/**
 * TanStack Query Client 설정
 * 전역 옵션 및 에러 핸들링 설정
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 데이터가 fresh로 유지되는 시간 (밀리초)
      staleTime: 1000 * 30, // 30초
      // 캐시에 유지되는 시간 (밀리초)
      gcTime: 1000 * 60 * 5, // 5분 (이전 cacheTime)
      // 자동 리프레시 설정
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      refetchOnMount: true,
      // 재시도 설정
      retry: 1,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      // Mutation 재시도 설정
      retry: 0,
    },
  },
})
