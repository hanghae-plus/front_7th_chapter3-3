import { getApiUrl } from "../../../shared/api/apiClient"

const likeCommentApi = async ({ id, likes }: { id: number; likes: number }) => {
  const response = await fetch(getApiUrl(`/comments/${id}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes }),
  })

  if (!response.ok) {
    throw new Error(`댓글 좋아요 실패: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data
}

export default likeCommentApi
