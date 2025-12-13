import { useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components"
import { useTagStore } from "@/entities/tag"
import { usePostStore } from "@/entities/post"
import { useUiStore } from "@/shared/model"

export const TagFilter = () => {
  const { tags, selectedTag, setSelectedTag, fetchTags } = useTagStore()
  const { fetchPostsByTag, fetchPosts } = usePostStore()
  const { limit, skip } = useUiStore()

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  const handleChange = (value: string) => {
    setSelectedTag(value)
    if (value && value !== "all") {
      fetchPostsByTag(value)
    } else {
      fetchPosts(limit, skip)
    }
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
