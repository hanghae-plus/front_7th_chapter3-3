import { useAtom } from "jotai"
import { selectedTagAtom } from "@/entities/tag/model/atoms"
import { useTagsQuery } from "@/entities/tag"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select"

export const ByTag = () => {
  const { data: tags = [] } = useTagsQuery()
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)

  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value)
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="태그 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem key={tag.url} value={tag.slug}>
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
