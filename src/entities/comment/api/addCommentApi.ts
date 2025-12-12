import { AddCommentRequest, Comment } from "../model/comment"
import { getApiUrl } from "../../../shared/api/apiClient"

const addCommentApi = async ({ comment }: { comment: AddCommentRequest }): Promise<Comment> => {
  const response = await fetch(getApiUrl(`/comments/add`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  })

  if (!response.ok) {
    throw new Error(`댓글 추가 실패: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data
}

export default addCommentApi
