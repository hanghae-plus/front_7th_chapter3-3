import { PAGINATION } from '../../../shared/config/constants'

/**
 * 게시물 페이지네이션 기능
 * 페이지네이션 관련 로직을 관리합니다.
 */
export const usePostPagination = (
  skip: number,
  limit: number,
  total: number,
  setSkip: (skip: number) => void,
  setLimit: (limit: number) => void,
  syncURL: (params?: { skip?: number; limit?: number }) => void
) => {
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
    setSkip(0)
    // 최신 값을 직접 전달하여 URL 동기화
    syncURL({ skip: 0, limit: newLimit })
  }

  const handlePrevPage = () => {
    const newSkip = Math.max(0, skip - limit)
    setSkip(newSkip)
    // 최신 값을 직접 전달하여 URL 동기화
    syncURL({ skip: newSkip })
  }

  const handleNextPage = () => {
    const newSkip = skip + limit
    setSkip(newSkip)
    // 최신 값을 직접 전달하여 URL 동기화
    syncURL({ skip: newSkip })
  }

  const canGoPrev = skip > 0
  const canGoNext = skip + limit < total

  return {
    handleLimitChange,
    handlePrevPage,
    handleNextPage,
    canGoPrev,
    canGoNext,
    limitOptions: PAGINATION.LIMIT_OPTIONS,
  }
}

