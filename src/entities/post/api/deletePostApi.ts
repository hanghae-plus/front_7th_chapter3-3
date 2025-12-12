import { getApiUrl } from "../../../shared/api/apiClient"

const deletePostApi = async ({ id }: { id: number }) => {
  const response = await fetch(getApiUrl(`/posts/${id}`), {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(`게시물 삭제 실패: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data
}

export default deletePostApi
