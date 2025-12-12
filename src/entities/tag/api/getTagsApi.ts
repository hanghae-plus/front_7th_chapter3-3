import { Tag } from "../model/tag"
import { getApiUrl } from "../../../shared/api/apiClient"

const getTagsApi = async (): Promise<Tag[] | []> => {
  try {
    const response = await fetch(getApiUrl("/posts/tags"))
    const data = await response.json()
    return data
  } catch (error) {
    console.error("태그 가져오기 오류:", error)
    return []
  }
}

export default getTagsApi
