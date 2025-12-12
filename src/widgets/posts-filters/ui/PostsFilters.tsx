import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/shared/ui'
import { usePostsStore } from '@/shared/model/store'
import { useTags } from '@/entities/post/api/queries'

interface PostsFiltersProps {
  onTagChange: (tag: string) => void
}

export const PostsFilters = ({ onTagChange }: PostsFiltersProps) => {
  const { selectedTag, setSelectedTag, sortBy, setSortBy, sortOrder, setSortOrder } = usePostsStore()
  const { data: tags } = useTags()

  const handleTagChange = (value: string) => {
    setSelectedTag(value)
    onTagChange(value)
  }

  return (
    <>
      <Select value={selectedTag} onValueChange={handleTagChange}>
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
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={(val) => setSortOrder(val as 'asc' | 'desc')}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </>
  )
}
