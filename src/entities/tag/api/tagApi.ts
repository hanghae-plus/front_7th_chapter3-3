import { apiClient } from "@/shared/api"
import type { TagsResponse } from "../model/types"

export const tagApi = {
  getAll: () => apiClient.get<TagsResponse>("/posts/tags"),
}
