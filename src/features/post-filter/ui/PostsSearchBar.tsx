import { Search } from "lucide-react";
import { Input } from "../../../components";
import { useState } from "react";

interface PostsSearchBarProps {
  searchQuery: string;
  onEnter: (searchKeyword: string) => void;
}

export default function PostsSearchBar({ searchQuery, onEnter }: PostsSearchBarProps) {
  const [searchKeyword, setSearchKeyword] = useState(searchQuery);
  return (
    <div className="flex-1">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="게시물 검색..."
          className="pl-8"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && onEnter(searchKeyword)}
        />
      </div>
    </div>
  );
}
