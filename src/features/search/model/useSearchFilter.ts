import { useSearchParams } from "react-router-dom"

export const useSearchFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchQuery = searchParams.get("search") || ""
  const selectedTag = searchParams.get("tag") || ""
  const sortBy = searchParams.get("sortBy") || ""
  const sortOrder = (searchParams.get("sortOrder") || "asc") as "asc" | "desc"
  const limit = Number(searchParams.get("limit")) || 10
  const skip = Number(searchParams.get("skip")) || 0

  const setSearchQuery = (query: string) => {
    if (query) {
      searchParams.set("search", query)
    } else {
      searchParams.delete("search")
    }
    setSearchParams(searchParams)
  }

  const setSelectedTag = (tag: string) => {
    if (tag && tag !== "all") {
      searchParams.set("tag", tag)
    } else {
      searchParams.delete("tag")
    }
    setSearchParams(searchParams)
  }

  const setSortBy = (field: string) => {
    searchParams.set("sortBy", field)
    setSearchParams(searchParams)
  }

  const setSortOrder = (order: "asc" | "desc") => {
    searchParams.set("sortOrder", order)
    setSearchParams(searchParams)
  }

  const setLimit = (newLimit: number) => {
    searchParams.set("limit", String(newLimit))
    setSearchParams(searchParams)
  }

  const setSkip = (newSkip: number) => {
    searchParams.set("skip", String(newSkip))
    setSearchParams(searchParams)
  }

  const clearFilters = () => {
    searchParams.delete("search")
    searchParams.delete("tag")
    searchParams.delete("sortBy")
    searchParams.delete("sortOrder")
    setSearchParams(searchParams)
  }

  return {
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    limit,
    skip,
    setSearchQuery,
    setSelectedTag,
    setSortBy,
    setSortOrder,
    setLimit,
    setSkip,
    clearFilters,
  }
}
