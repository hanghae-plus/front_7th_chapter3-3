import PostsSearchBar from "./PostsSearchBar";
import { SelectDropdown } from "../../../shared/ui";
import { useTagsQuery } from "../../../entities/post";
import { PostFilterParams } from "../model";

interface PostsFiltersProps {
  filter: PostFilterParams;
  onFilterChange: (filter: Partial<PostFilterParams>) => void;
}

export default function PostsFilters({ filter, onFilterChange }: PostsFiltersProps) {
  const { data: tags } = useTagsQuery();

  return (
    <div className="flex gap-4">
      <PostsSearchBar
        searchQuery={filter.search || ""}
        onEnter={(value) => onFilterChange({ search: value, tag: null, sortBy: null, sortOrder: null })}
      />
      <SelectDropdown
        options={tags?.map((tag) => ({ label: tag.slug, value: tag.slug, key: tag.url })) || []}
        value={filter.tag ?? ""}
        onChange={(value) => onFilterChange({ tag: value, search: null, sortBy: null, sortOrder: null })}
        placeholder="태그 선택"
      />
      <SelectDropdown
        options={[
          { label: "없음", value: "none" },
          { label: "ID", value: "id" },
          { label: "제목", value: "title" },
          { label: "반응", value: "reactions" },
        ]}
        value={filter.sortBy || ""}
        onChange={(value) => onFilterChange({ sortBy: value, tag: null, search: null })}
        placeholder="정렬 기준"
      />
      <SelectDropdown
        options={[
          { label: "오름차순", value: "asc" },
          { label: "내림차순", value: "desc" },
        ]}
        value={filter.sortOrder || ""}
        onChange={(value) => onFilterChange({ sortOrder: value as "asc" | "desc", tag: null, search: null })}
        placeholder="정렬 순서"
      />
    </div>
  );
}
