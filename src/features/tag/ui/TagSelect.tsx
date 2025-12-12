import { useQuery } from "@tanstack/react-query"
import { tagQueries } from "../../../entities/tag/api/queries"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { useTagSelect } from "../lib/useTagSelect"

const TagSelect = () => {
  const { data: tags, error } = useQuery(tagQueries.list())
  const { selectedTag, handleChangeTag } = useTagSelect()

  if (error) {
    return (
      <Select value={selectedTag} onValueChange={handleChangeTag} disabled>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 로딩 실패" />
        </SelectTrigger>
      </Select>
    )
  }

  return (
    <Select value={selectedTag} onValueChange={handleChangeTag}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags?.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default TagSelect
