import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/shared/ui"

interface SearchBarProps {
  initialValue?: string
  onSearch: (query: string) => void
}

export const SearchBar = ({ initialValue = "", onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue)

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(query)
    }
  }

  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  )
}
