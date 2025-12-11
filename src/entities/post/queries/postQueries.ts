import { queryOptions } from "@tanstack/react-query"
import * as postApi from "../api/postApi"

/**
 * Post Query Factory
 *
 * TanStack Query 가이드를 따라 Query Options를 관리하는 Factory 패턴
 * - all / lists / details 계층 구조로 키 정형화
 * - queryOptions()로 타입 안정성 확보
 * - queryKey에 queryFn의 모든 의존성 포함
 */
export const postQueries = {
  // 키 계층
  all: () => ["posts"] as const,
  lists: () => [...postQueries.all(), "list"] as const,
  details: () => [...postQueries.all(), "detail"] as const,

  /**
   * 게시물 목록 조회 (페이지네이션)
   * @param params - limit, skip 페이지네이션 파라미터
   * @returns PostsResponse (posts[], total, skip, limit)
   */
  list: (params: { limit: number; skip: number }) =>
    queryOptions({
      queryKey: [...postQueries.lists(), params],
      queryFn: () => postApi.fetchPosts(params),
      staleTime: 30_000, // 30초 - 게시물 목록은 자주 변경될 수 있음
    }),

  /**
   * 태그별 게시물 조회
   * @param tag - 태그 이름
   * @returns PostsResponse
   */
  listByTag: (tag: string) =>
    queryOptions({
      queryKey: [...postQueries.lists(), "tag", tag],
      queryFn: () => postApi.fetchPostsByTag(tag),
      staleTime: 60_000, // 1분 - 태그별 게시물은 덜 변경됨
    }),

  /**
   * 게시물 검색
   * @param query - 검색어
   * @returns PostsResponse
   */
  search: (query: string) =>
    queryOptions({
      queryKey: [...postQueries.lists(), "search", query],
      queryFn: () => postApi.searchPosts(query),
      staleTime: 30_000, // 30초
      enabled: !!query, // 검색어가 있을 때만 실행
    }),
}
