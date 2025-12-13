import { Search } from "lucide-react"
import { Input } from "@/components"
import { useUiStore } from "@/shared/model"

export const SearchInput = () => {
  const { searchQuery, setSearchQuery, setSkip } = useUiStore()

  const handleSearch = () => {
    setSkip(0)
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
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
    </div>
  )
}
