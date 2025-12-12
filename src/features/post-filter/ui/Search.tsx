import { useState } from "react"
import { useSetAtom } from "jotai"
import { SearchIcon } from "lucide-react"
import { searchQueryAtom } from "../model/atoms"
import { Input } from "@/shared/ui/Input"

export const Search = () => {
  const [inputValue, setInputValue] = useState("")
  const setSearchQuery = useSetAtom(searchQueryAtom)

  // Enter 키를 눌렀을 때 검색 실행
  const handleSearch = () => {
    setSearchQuery(inputValue)
  }

  return (
    <div className="flex-1">
      <div className="relative">
        <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
    </div>
  )
}
