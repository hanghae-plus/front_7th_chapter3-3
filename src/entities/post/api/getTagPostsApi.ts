import { GetPostsResponse } from "../model/post"
import { getApiUrl } from "../../../shared/api/apiClient"

const getTagPostsApi = async ({
  tag,
  limit,
  skip,
}: {
  tag: string
  limit: number
  skip: number
}): Promise<GetPostsResponse> => {
  try {
    const response = await fetch(getApiUrl(`/posts/tag/${tag}?limit=${limit}&skip=${skip}`))
    const data = await response.json()
    return data
  } catch (error) {
    console.error("태그별 게시물 가져오기 오류:", error)
    return { posts: [], total: 0, skip: 0, limit: 0 }
  }
}

export default getTagPostsApi
