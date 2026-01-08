/**
 * Post Search Feature UI
 * 
 * 게시물 검색 입력 컴포넌트
 */

import { Search } from "lucide-react"
import { Input } from "../../../shared/ui"
import { usePostSearch } from "../model/use-post-search"
import { usePostStore } from "../../../entities/post/model"

interface PostSearchProps {
  className?: string
}

/**
 * 게시물 검색 컴포넌트
 */
export function PostSearch({ className }: PostSearchProps) {
  const { searchQuery, handleSearch } = usePostSearch()
  const { setSearchQuery } = usePostStore()

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery)
    }
  }

  return (
    <div className={`relative ${className || ""}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        type="text"
        placeholder="게시물 검색..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="pl-10"
      />
    </div>
  )
}

