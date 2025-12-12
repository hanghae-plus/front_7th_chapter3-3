import { Search } from "lucide-react"
import { Input } from "../../../shared/ui"
import { useSearch } from "../lib/useSearch"

const SearchInput = () => {
  const { search, handleSearch } = useSearch()

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={search}
          onChange={handleSearch.change}
          onKeyDown={handleSearch.keydown}
        />
      </div>
    </div>
  )
}

export default SearchInput
