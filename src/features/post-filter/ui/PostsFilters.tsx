import PostsSearchBar from "./PostsSearchBar";
import SelectDropdown from "../../../shared/ui/SelectDropdown";
import { useUrlSearchParams } from "../../../shared/hooks/use-url-search-params";
import { useState } from "react";
import { usePostsWithSearchQuery } from "../../../entities/post/hooks/use-posts-with-search-query";
import { usePostsQuery } from "../../../entities/post/hooks/use-posts-query";
import { usePostsWithTagQuery } from "../../../entities/post/hooks/use-posts-with-tag-query";
import { useTagsQuery } from "../../../entities/post/hooks/use-tags-query";

interface PostsFiltersProps {
  skip?: number;
  limit?: number;
}

export default function PostsFilters({ skip, limit }: PostsFiltersProps) {
  const { queryParams } = useUrlSearchParams();
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "");
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc");

  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "");

  const { data: tags } = useTagsQuery();

  usePostsQuery({ params: { skip: skip?.toString(), limit: limit?.toString(), sortBy, sortOrder } });
  usePostsWithSearchQuery({ searchQuery, enabled: !!searchQuery });
  usePostsWithTagQuery({ tag: selectedTag, enabled: !!selectedTag });

  return (
    <div className="flex gap-4">
      <PostsSearchBar searchQuery={searchQuery} onEnter={(value) => setSearchQuery(value)} />
      <SelectDropdown
        options={tags?.map((tag) => ({ label: tag.slug, value: tag.slug, key: tag.url })) || []}
        value={selectedTag}
        onChange={setSelectedTag}
        placeholder="태그 선택"
      />
      <SelectDropdown
        options={[
          { label: "없음", value: "none" },
          { label: "ID", value: "id" },
          { label: "제목", value: "title" },
          { label: "반응", value: "reactions" },
        ]}
        value={sortBy}
        onChange={setSortBy}
        placeholder="정렬 기준"
      />
      <SelectDropdown
        options={[
          { label: "오름차순", value: "asc" },
          { label: "내림차순", value: "desc" },
        ]}
        value={sortOrder}
        onChange={setSortOrder}
        placeholder="정렬 순서"
      />
    </div>
  );
}
