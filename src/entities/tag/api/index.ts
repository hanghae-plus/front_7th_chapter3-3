import { Tag } from "../model/types"
import { API_BASE_URL } from "@/shared/api/config"

// 태그 가져오기
export const fetchTags = async () => {
  const response = await fetch(`${API_BASE_URL}/posts/tags`)
  if (!response.ok) {
    throw new Error("태그 가져오기 오류: " + response.statusText)
  }
  return (await response.json()) as Tag[]
}
