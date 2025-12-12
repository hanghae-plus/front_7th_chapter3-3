import { createContext, useContext, ReactNode } from "react"
import { useSearchParams } from "react-router-dom"

export interface PostsParams {
  skip: number
  limit: number
  search: string
  tag: string
  sortBy: string
  sortOrder: string
}

interface PostsParamsContextValue {
  params: PostsParams
  updateParams: (updates: Partial<Record<keyof PostsParams, string | number>>) => void
  resetParams: () => void
}

const PostsParamsContext = createContext<PostsParamsContextValue | null>(null)

export const PostsParamsProvider = ({ children }: { children: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams()

  // URL 파라미터에서 상태 추출
  const params: PostsParams = {
    skip: parseInt(searchParams.get("skip") || "0"),
    limit: parseInt(searchParams.get("limit") || "10"),
    search: searchParams.get("search") || "",
    tag: searchParams.get("tag") || "",
    sortBy: searchParams.get("sortBy") || "",
    sortOrder: searchParams.get("sortOrder") || "",
  }

  // URL 파라미터 업데이트 함수
  const updateParams = (updates: Partial<Record<keyof PostsParams, string | number>>) => {
    const newParams = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        newParams.set(key, String(value))
      } else {
        newParams.delete(key)
      }
    })

    setSearchParams(newParams)
  }

  // 모든 파라미터 초기화
  const resetParams = () => {
    setSearchParams({})
  }

  return (
    <PostsParamsContext.Provider value={{ params, updateParams, resetParams }}>
      {children}
    </PostsParamsContext.Provider>
  )
}

export const usePostsParams = () => {
  const context = useContext(PostsParamsContext)
  if (!context) {
    throw new Error("usePostsParams must be used within PostsParamsProvider")
  }
  return context
}
