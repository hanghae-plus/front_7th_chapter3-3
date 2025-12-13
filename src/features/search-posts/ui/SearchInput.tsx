import { Search } from "lucide-react"
import { Input } from "@/components"
import { useUiStore } from "@/shared/model"
import { usePostStore } from "@/entities/post"

export const SearchInput = () => {
  const { searchQuery, setSearchQuery } = useUiStore()
  const { searchPosts, fetchPosts } = usePostStore()
  const { limit, skip } = useUiStore()

  const handleSearch = () => {
    if (searchQuery) {
      searchPosts(searchQuery)
    } else {
      fetchPosts(limit, skip)
    }
  }

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
    </div>
  )
}
