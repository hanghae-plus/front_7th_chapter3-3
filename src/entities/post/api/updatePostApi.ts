import { getApiUrl } from "../../../shared/api/apiClient"

const updatePostApi = async ({ post }: { post: any }) => {
  const response = await fetch(getApiUrl(`/posts/${post.id}`), {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })

  if (!response.ok) {
    throw new Error(`게시물 수정 실패: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data
}

export default updatePostApi
