import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
      retry: (failureCount, error) => {
        // 4xx 에러는 재시도하지 않음
        if (error && typeof error === "object" && "status" in error) {
          const status = (error as { status?: number }).status
          if (status && status >= 400 && status < 500) {
            return false
          }
        }
        // 5xx 에러는 최대 2번까지 재시도
        return failureCount < 2
      },
    },
    mutations: {
      retry: (failureCount, error) => {
        // 4xx 에러는 재시도하지 않음
        if (error && typeof error === "object" && "status" in error) {
          const status = (error as { status?: number }).status
          if (status && status >= 400 && status < 500) {
            return false
          }
        }
        // 5xx 에러는 최대 1번까지 재시도
        return failureCount < 1
      },
    },
  },
})
