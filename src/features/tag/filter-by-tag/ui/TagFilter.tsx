import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui"
import { Tag } from "@/entities/tag"

interface TagFilterProps {
  tags: Tag[]
  selectedTag: string
  onTagChange: (tag: string) => void
}

export const TagFilter = ({ tags, selectedTag, onTagChange }: TagFilterProps) => {
  return (
    <Select value={selectedTag || "all"} onValueChange={onTagChange}>
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
