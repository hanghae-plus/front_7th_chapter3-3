import { getApiUrl } from "../../../shared/api/apiClient"

const deleteCommentApi = async ({ id }: { id: number }) => {
  const response = await fetch(getApiUrl(`/comments/${id}`), {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`댓글 삭제 실패: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data
}

export default deleteCommentApi
