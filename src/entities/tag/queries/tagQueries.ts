import { queryOptions } from "@tanstack/react-query"
import * as tagApi from "../api/tagApi"

/**
 * Tag Query Factory
 *
 * 태그 관련 쿼리 옵션을 관리하는 Factory 패턴
 * - 모든 태그 목록 조회만 존재 (단일 엔드포인트)
 */
export const tagQueries = {
  // 키 계층
  all: () => ["tags"] as const,

  /**
   * 모든 태그 목록 조회
   * @returns Tag[] (slug, name, url)
   */
  list: () =>
    queryOptions({
      queryKey: tagQueries.all(),
      queryFn: () => tagApi.fetchTags(),
      staleTime: 10 * 60_000, // 10분 - 태그는 거의 변경되지 않음
    }),
}
