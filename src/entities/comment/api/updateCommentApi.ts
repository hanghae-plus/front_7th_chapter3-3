import { getApiUrl } from "../../../shared/api/apiClient"

const updateCommentApi = async ({ comment }: { comment: any }) => {
  const response = await fetch(getApiUrl(`/comments/${comment.id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: comment.body }),
  })

  if (!response.ok) {
    throw new Error(`댓글 수정 실패: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data
}
export default updateCommentApi
