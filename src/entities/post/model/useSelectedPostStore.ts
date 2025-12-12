import { create } from "zustand"
import { Post } from "../../../entities/post/model/post"

interface SelectedPostStore {
  selectedPost: Post | null
  setSelectedPost: (post: Post | null) => void
}

export const useSelectedPostStore = create<SelectedPostStore>((set) => ({
  selectedPost: null,
  setSelectedPost: (post: Post | null) => set({ selectedPost: post }),
}))
