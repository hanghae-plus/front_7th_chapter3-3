import { create } from "zustand"
import { Tag } from "../types"
import { tagApi } from "../api"

interface TagState {
  tags: Tag[]
  selectedTag: string

  // Actions
  fetchTags: () => Promise<void>
  setSelectedTag: (tag: string) => void
}

export const useTagStore = create<TagState>((set) => ({
  tags: [],
  selectedTag: "",

  fetchTags: async () => {
    try {
      const tags = await tagApi.getTags()
      set({ tags })
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  },

  setSelectedTag: (tag) => set({ selectedTag: tag }),
}))
