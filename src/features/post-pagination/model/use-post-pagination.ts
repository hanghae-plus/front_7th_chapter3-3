/**
 * Post Pagination Feature Hook
 *
 * 게시물 페이지네이션 기능을 위한 커스텀 훅
 */

import { usePostStore } from "../../../entities/post/model"
import { useLocation, useNavigate } from "react-router-dom"

/**
 * 게시물 페이지네이션 훅
 */
export function usePostPagination() {
  const { skip, limit, setSkip, setLimit, fetchPosts, total } = usePostStore()
  const navigate = useNavigate()
  const location = useLocation()

  // URL 파라미터 업데이트
  const updateURL = () => {
    const params = new URLSearchParams(location.search)
    if (skip) params.set("skip", skip.toString())
    else params.delete("skip")
    if (limit) params.set("limit", limit.toString())
    else params.delete("limit")
    navigate(`?${params.toString()}`)
  }

  // 다음 페이지
  const handleNextPage = () => {
    const newSkip = skip + limit
    if (newSkip < total) {
      setSkip(newSkip)
      updateURL()
      fetchPosts({ skip: newSkip, limit })
    }
  }

  // 이전 페이지
  const handlePrevPage = () => {
    const newSkip = Math.max(0, skip - limit)
    setSkip(newSkip)
    updateURL()
    fetchPosts({ skip: newSkip, limit })
  }

  // 페이지 크기 변경
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
    setSkip(0)
    updateURL()
    fetchPosts({ skip: 0, limit: newLimit })
  }

  return {
    skip,
    limit,
    total,
    handleNextPage,
    handlePrevPage,
    handleLimitChange,
  }
}
