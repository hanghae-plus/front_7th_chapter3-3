import { createContext, useContext, useState } from "react";
import { useUrlSearchParams } from "../../../shared/hooks/use-url-search-params";

interface PostFiltersContextValue {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (sortOrder: string) => void;
  selectedTag: string;
  setSelectedTag: (selectedTag: string) => void;
}

const PostFiltersContext = createContext<PostFiltersContextValue | null>(null);

export function PostFiltersProvider({ children }: { children: React.ReactNode }) {
  const { queryParams } = useUrlSearchParams();
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "");
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc");
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");
  return (
    <PostFiltersContext
      value={{ searchQuery, setSearchQuery, sortBy, setSortBy, sortOrder, setSortOrder, selectedTag, setSelectedTag }}
    >
      {children}
    </PostFiltersContext>
  );
}

export function usePostFilters() {
  const context = useContext(PostFiltersContext);
  if (!context) {
    throw new Error("usePostFilters must be used within a PostFiltersProvider");
  }
  return context;
}
