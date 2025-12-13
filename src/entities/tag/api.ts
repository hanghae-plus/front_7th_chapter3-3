import { apiClient } from "@/shared/api"
import { Tag } from "./types"

export const tagApi = {
  async getTags(): Promise<Tag[]> {
    return apiClient<Tag[]>("/posts/tags")
  },
}
