import { GetCommentsResponse } from "../model/comment"
import { getApiUrl } from "../../../shared/api/apiClient"

const getCommentsApi = async ({ postId }: { postId: number }): Promise<GetCommentsResponse> => {
  try {
    const response = await fetch(getApiUrl(`/comments/post/${postId}`))
    const data = await response.json()
    return data
  } catch (error) {
    console.error("댓글 가져오기 오류:", error)
    return { comments: [], total: 0, skip: 0, limit: 0 }
  }
}

export default getCommentsApi
