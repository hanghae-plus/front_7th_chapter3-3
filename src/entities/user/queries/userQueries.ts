import { queryOptions } from "@tanstack/react-query"
import * as userApi from "../api/userApi"

/**
 * User Query Factory
 *
 * 사용자 관련 쿼리 옵션을 관리하는 Factory 패턴
 * - lists: 사용자 목록 조회
 * - details: 특정 사용자 상세 조회
 */
export const userQueries = {
  // 키 계층
  all: () => ["users"] as const,
  lists: () => [...userQueries.all(), "list"] as const,
  details: () => [...userQueries.all(), "detail"] as const,

  /**
   * 사용자 목록 조회
   * @param params - limit, select 옵션
   * @returns UsersResponse (users[], total, skip, limit)
   */
  list: (params?: { limit?: number; select?: string }) =>
    queryOptions({
      queryKey: [...userQueries.lists(), params],
      queryFn: () => userApi.fetchUsers(params),
      staleTime: 5 * 60_000, // 5분 - 사용자 정보는 자주 변경되지 않음
    }),

  /**
   * 특정 사용자 상세 조회
   * @param userId - 사용자 ID
   * @returns User
   */
  detail: (userId: number) =>
    queryOptions({
      queryKey: [...userQueries.details(), userId],
      queryFn: () => userApi.fetchUser(userId),
      staleTime: 5 * 60_000, // 5분
      enabled: !!userId, // userId가 있을 때만 실행
    }),
}
