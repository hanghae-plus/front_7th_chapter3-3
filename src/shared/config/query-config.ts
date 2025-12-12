const SECOND = 1000;
const MINUTE = 60 * SECOND;

/**
 * 데이터 특성별 staleTime
 * - STATIC: 거의 변하지 않는 데이터 (tags, categories 등)
 * - SEMI_STATIC: 드물게 변하는 데이터 (users 프로필 등)
 * - DYNAMIC: 자주 변하는 데이터 (posts, comments 등)
 */
export const STALE_TIME = {
  STATIC: 30 * MINUTE,
  SEMI_STATIC: 5 * MINUTE,
  DYNAMIC: 1 * MINUTE,
} as const;

/**
 * QueryClient 기본 설정
 */
export const DEFAULT_QUERY_OPTIONS = {
  staleTime: STALE_TIME.DYNAMIC,
  refetchOnWindowFocus: false,
} as const;
