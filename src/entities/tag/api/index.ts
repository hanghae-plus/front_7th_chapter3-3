import { apiClient } from "@/shared/api/client"
import type { Tag } from "@/shared/types"

const API_BASE = "/api"

export const tagApi = {
  async getTags(): Promise<Tag[]> {
    return apiClient.get<Tag[]>(`${API_BASE}/posts/tags`)
  },
}
