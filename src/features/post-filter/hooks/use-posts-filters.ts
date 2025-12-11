import { useState } from "react";
import { PostGetQueryParams } from "../../../entities/post/api/dto";

interface PostsFiltersProps {
  filters: PostGetQueryParams;
}
export function usePostsFilters({ filters }: PostsFiltersProps) {
  const [searchQuery, setSearchQuery] = useState(filters.search || "");
  const [sortBy, setSortBy] = useState(filters.sortBy || "");
  const [sortOrder, setSortOrder] = useState(filters.sortOrder || "asc");

  return { searchQuery, sortBy, sortOrder, setSearchQuery, setSortBy, setSortOrder };
}
