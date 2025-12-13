import { useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/selects"
import { useTagStore } from "@/entities/tag"
import { useUiStore } from "@/shared/model"

export const TagFilter = () => {
  const { tags, selectedTag, setSelectedTag, fetchTags } = useTagStore()
  const { setSkip } = useUiStore()

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  const handleChange = (value: string) => {
    setSelectedTag(value)
    setSkip(0)
  }

  return (
    <Select value={selectedTag} onValueChange={handleChange}>
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
