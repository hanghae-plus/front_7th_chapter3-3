import PostsSearchBar from "./PostsSearchBar";
import SelectDropdown from "../../../shared/ui/SelectDropdown";
import { useTagsQuery } from "../../../entities/post/hooks/use-tags-query";
import { usePostFilters } from "../providers/PostFiltersContext";

export default function PostsFilters() {
  const { searchQuery, setSearchQuery, sortBy, setSortBy, sortOrder, setSortOrder, selectedTag, setSelectedTag } =
    usePostFilters();

  const { data: tags } = useTagsQuery();

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
