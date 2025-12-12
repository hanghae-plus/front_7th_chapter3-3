import { create } from 'zustand'

interface PostsStore {
  searchQuery: string
  selectedTag: string
  skip: number
  limit: number
  sortBy: string
  sortOrder: 'asc' | 'desc'
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: 'asc' | 'desc') => void
  resetPagination: () => void
}

export const usePostsStore = create<PostsStore>((set) => ({
  searchQuery: '',
  selectedTag: '',
  skip: 0,
  limit: 10,
  sortBy: '',
  sortOrder: 'asc',
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedTag: (tag) => set({ selectedTag: tag, skip: 0 }),
  setSkip: (skip) => set({ skip }),
  setLimit: (limit) => set({ limit, skip: 0 }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (order) => set({ sortOrder: order }),
  resetPagination: () => set({ skip: 0 }),
}))
