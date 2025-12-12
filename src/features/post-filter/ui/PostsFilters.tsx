import PostsSearchBar from "./PostsSearchBar";
import SelectDropdown from "../../../shared/ui/SelectDropdown";
import { useTagsQuery } from "../../../entities/post/hooks/use-tags-query";
import { usePostsUrlQuery } from "../../../shared/url-query";

export default function PostsFilters() {
  const { queryParams, setQueryParams } = usePostsUrlQuery();

  const { data: tags } = useTagsQuery();

  return (
    <div className="flex gap-4">
      <PostsSearchBar
        searchQuery={queryParams.search || ""}
        onEnter={(value) => setQueryParams({ search: value, tag: null, sortBy: null, sortOrder: null })}
      />
      <SelectDropdown
        options={tags?.map((tag) => ({ label: tag.slug, value: tag.slug, key: tag.url })) || []}
        value={queryParams.tag ?? ""}
        onChange={(value) => setQueryParams({ tag: value, search: null, sortBy: null, sortOrder: null })}
        placeholder="태그 선택"
      />
      <SelectDropdown
        options={[
          { label: "없음", value: "none" },
          { label: "ID", value: "id" },
          { label: "제목", value: "title" },
          { label: "반응", value: "reactions" },
        ]}
        value={queryParams.sortBy || ""}
        onChange={(value) => setQueryParams({ sortBy: value, tag: null, search: null })}
        placeholder="정렬 기준"
      />
      <SelectDropdown
        options={[
          { label: "오름차순", value: "asc" },
          { label: "내림차순", value: "desc" },
        ]}
        value={queryParams.sortOrder || ""}
        onChange={(value) => setQueryParams({ sortOrder: value as "asc" | "desc", tag: null, search: null })}
        placeholder="정렬 순서"
      />
    </div>
  );
}
