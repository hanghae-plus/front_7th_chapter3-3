import { GetPostsResponse } from "../model/post"
import { getApiUrl } from "../../../shared/api/apiClient"

const getSearchPostsApi = async ({
  searchQuery,
  limit,
  skip,
}: {
  searchQuery: string
  limit: number
  skip: number
}): Promise<GetPostsResponse> => {
  try {
    const response = await fetch(getApiUrl(`/posts/search?q=${searchQuery}&limit=${limit}&skip=${skip}`))
    const data: GetPostsResponse = await response.json()

    return data
  } catch (error) {
    console.error("게시물 검색 오류:", error)
    return { posts: [], total: 0, skip: 0, limit: 0 }
  }
}

export default getSearchPostsApi
