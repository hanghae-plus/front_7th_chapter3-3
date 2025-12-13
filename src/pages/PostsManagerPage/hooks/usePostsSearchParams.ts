import { useSearchParams } from "react-router-dom"

export const usePostsSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // URL에서 값 읽기
  const skip = parseInt(searchParams.get("skip") || "0")
  const limit = parseInt(searchParams.get("limit") || "10")
  const searchQuery = searchParams.get("search") || ""
  const sortBy = searchParams.get("sortBy") || ""
  const sortOrder = searchParams.get("sortOrder") || "asc"
  const selectedTag = searchParams.get("tag") || ""

  // URL 업데이트 함수
  const updateParams = (updates: {
    skip?: number
    limit?: number
    search?: string
    sortBy?: string
    sortOrder?: string
    tag?: string
  }) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev)

      Object.entries(updates).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          newParams.set(key, String(value))
        } else {
          newParams.delete(key)
        }
      })

      return newParams
    })
  }

  return {
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    updateParams,
  }
}
