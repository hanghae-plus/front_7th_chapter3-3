import { Tag } from "../model/tag"

export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const response = await fetch("/api/tags")
    const data = await response.json()
    return data
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
    return []
  }
}
