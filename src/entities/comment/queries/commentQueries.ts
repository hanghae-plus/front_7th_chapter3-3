import { queryOptions } from "@tanstack/react-query"
import * as commentApi from "../api/commentApi"

/**
 * Comment Query Factory
 *
 * 댓글 관련 쿼리 옵션을 관리하는 Factory 패턴
 * - 게시물별 댓글 조회만 GET 요청 존재
 */
export const commentQueries = {
  // 키 계층
  all: () => ["comments"] as const,
  lists: () => [...commentQueries.all(), "list"] as const,

  /**
   * 특정 게시물의 댓글 목록 조회
   * @param postId - 게시물 ID
   * @returns CommentsResponse (comments[], total)
   */
  listByPost: (postId: number) =>
    queryOptions({
      queryKey: [...commentQueries.lists(), "post", postId],
      queryFn: () => commentApi.fetchComments(postId),
      staleTime: 30_000, // 30초 - 댓글은 자주 변경될 수 있음
      enabled: !!postId, // postId가 있을 때만 실행
    }),
}
