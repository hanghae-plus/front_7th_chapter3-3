import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"
import { useFilterStore } from "../model/store"
import { useTags } from "@/entities/tag"

export const TagFilter = () => {
  const { selectedTag, setSelectedTag } = useFilterStore()
  const { data: tags } = useTags()

  return (
    <Select value={selectedTag} onValueChange={setSelectedTag}>
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
