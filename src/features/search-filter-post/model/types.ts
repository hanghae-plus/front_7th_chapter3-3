export interface PostSearchFilterState {
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: string
}

export interface PostSearchFilterParams {
  search?: string
  tag?: string
  sortBy?: string
  sortOrder?: string
}
