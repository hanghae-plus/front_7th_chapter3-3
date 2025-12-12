import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface FilterState {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: "asc" | "desc"

  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: "asc" | "desc") => void
  reset: () => void
}

const initialState = {
  searchQuery: "",
  selectedTag: "",
  sortBy: "",
  sortOrder: "asc" as const,
}

export const useFilterStore = create<FilterState>()(
  devtools(
    (set) => ({
      ...initialState,

      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setSelectedTag: (selectedTag) => set({ selectedTag }),
      setSortBy: (sortBy) => set({ sortBy }),
      setSortOrder: (sortOrder) => set({ sortOrder }),
      reset: () => set(initialState),
    }),
    { name: "filter-store" },
  ),
)
