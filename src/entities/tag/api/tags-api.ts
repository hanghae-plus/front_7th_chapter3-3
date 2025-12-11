import { TagsResponse } from "../model"

export const tagsApi = {
  // 모든 태그 조회
  getTags: async (): Promise<TagsResponse> => {
    const response = await fetch("/api/posts/tags")
    return response.json()
  },

  // 태그로 게시물 조회
  getPostsByTag: async (tag: string) => {
    const response = await fetch(`/api/posts/tag/${tag}`)
    return response.json()
  },
}

