import { AddPostRequest } from "../model/post"
import { getApiUrl } from "../../../shared/api/apiClient"

const addPostApi = async ({ post }: { post: AddPostRequest }) => {
  const response = await fetch(getApiUrl("/posts/add"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })

  if (!response.ok) {
    throw new Error(`게시물 추가 실패: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  return data
}

export default addPostApi
