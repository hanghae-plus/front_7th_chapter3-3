import { PostSearchFilterState } from "./types"

export const parseSearchParams = (search: string): PostSearchFilterState => {
  const params = new URLSearchParams(search)
  return {
    searchQuery: params.get("search") || "",
    selectedTag: params.get("tag") || "",
    sortBy: params.get("sortBy") || "",
    sortOrder: params.get("sortOrder") || "asc",
  }
}

export const buildSearchParams = (
  state: PostSearchFilterState,
  additionalParams?: Record<string, string>,
): URLSearchParams => {
  const params = new URLSearchParams()

  if (state.searchQuery) params.set("search", state.searchQuery)
  if (state.selectedTag) params.set("tag", state.selectedTag)
  if (state.sortBy) params.set("sortBy", state.sortBy)
  if (state.sortOrder) params.set("sortOrder", state.sortOrder)

  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
  }

  return params
}
