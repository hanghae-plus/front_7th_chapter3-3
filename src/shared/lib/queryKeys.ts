/**
 * 쿼리 키 팩토리
 * 모든 쿼리 키를 중앙에서 관리하여 타입 안정성과 일관성 확보
 */

export const postKeys = {
  // 게시물 목록
  list: (limit?: number, skip?: number) => ['posts', 'list', { limit, skip }] as const,
  // 게시물 단건
  detail: (id: number) => ['posts', id] as const,
  // 게시물 검색
  search: (query: string) => ['posts', 'search', { query }] as const,
  // 태그별 게시물
  byTag: (tag: string) => ['posts', 'tag', { tag }] as const,
  // 태그 목록
  tags: () => ['posts', 'tags'] as const,
  // 모든 게시물 관련 쿼리
  all: () => ['posts'] as const,
}

export const commentKeys = {
  // 게시물별 댓글 목록
  list: (postId: number) => ['comments', 'post', postId] as const,
  // 댓글 단건
  detail: (id: number) => ['comments', id] as const,
  // 모든 댓글 관련 쿼리
  all: () => ['comments'] as const,
}

export const userKeys = {
  // 사용자 목록
  list: (params?: { limit?: number; skip?: number; select?: string }) =>
    ['users', 'list', params] as const,
  // 사용자 단건
  detail: (id: number) => ['users', id] as const,
  // 모든 사용자 관련 쿼리
  all: () => ['users'] as const,
}
