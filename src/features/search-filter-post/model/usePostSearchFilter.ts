import { useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { PostSearchFilterState } from "./types"
import { parseSearchParams, buildSearchParams } from "./utils"

export function usePostSearchFilter(additionalParams?: Record<string, string>) {
  const navigate = useNavigate()
  const location = useLocation()

  // URL을 source of truth로 사용 - URL에서 직접 상태를 계산
  const filterState = useMemo(() => parseSearchParams(location.search), [location.search])

  // 상태 변경 시 URL 업데이트
  const updateURL = (newState?: Partial<PostSearchFilterState>, extraParams?: Record<string, string>) => {
    const stateToUpdate = newState ? { ...filterState, ...newState } : filterState
    const allAdditionalParams = { ...additionalParams, ...extraParams }
    const params = buildSearchParams(stateToUpdate, allAdditionalParams)
    navigate(`?${params.toString()}`)
  }

  // 개별 상태 업데이트 함수들
  const setSearchQuery = (value: string) => {
    updateURL({ searchQuery: value })
  }

  const setSelectedTag = (value: string) => {
    updateURL({ selectedTag: value })
  }

  const setSortBy = (value: string) => {
    updateURL({ sortBy: value })
  }

  const setSortOrder = (value: string) => {
    updateURL({ sortOrder: value })
  }

  const handleSearch = () => {
    updateURL()
  }

  return {
    ...filterState,
    setSearchQuery,
    setSelectedTag,
    setSortBy,
    setSortOrder,
    handleSearch,
    updateURL,
  }
}
