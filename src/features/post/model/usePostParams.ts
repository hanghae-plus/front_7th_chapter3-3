import { useCallback, useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { PostParams } from "../../../entities/post/model/post"

export type { PostParams }

const usePostParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const updateParams = useCallback(
    (newParams: Partial<PostParams>) => {
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          searchParams.delete(key)
        } else {
          searchParams.set(key, String(value))
        }
      })

      setSearchParams(searchParams)
    },
    [searchParams],
  )

  const params: PostParams = useMemo(() => {
    return {
      skip: Number(searchParams.get("skip") ?? 0),
      limit: Number(searchParams.get("limit") ?? 10),
      searchQuery: searchParams.get("searchQuery") ?? "",
      sortBy: searchParams.get("sortBy") ?? "",
      sortOrder: searchParams.get("sortOrder") ?? "asc",
      selectedTag: searchParams.get("selectedTag") ?? "",
    }
  }, [searchParams])

  return {
    params,
    updateParams,
  }
}

export default usePostParams

