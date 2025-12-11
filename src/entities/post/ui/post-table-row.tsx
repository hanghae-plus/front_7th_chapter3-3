import { highlightText } from "@/shared/lib/text"
import { TableCell, TableRow } from "@/shared/ui"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { TagBadge } from "@/entities/tag"
import type { Post } from "../model/types"

interface PostTableRowProps {
  post: Post
  searchQuery?: string
  selectedTag?: string
  onTagClick?: (tag: string) => void
  onUserClick?: (userId: number) => void
  actions?: React.ReactNode
}

export const PostTableRow = ({
  post,
  searchQuery = "",
  selectedTag = "",
  onTagClick,
  onUserClick,
  actions,
}: PostTableRowProps) => {
  return (
    <TableRow>
      {/* ID */}
      <TableCell className="w-[50px]">{post.id}</TableCell>

      {/* 제목 + 태그 */}
      <TableCell>
        <div className="space-y-1">
          {/* 제목 (검색어 하이라이트) */}
          <div>{highlightText(post.title, searchQuery)}</div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => (
              <TagBadge key={tag} tag={tag} isSelected={selectedTag === tag} onClick={onTagClick} />
            ))}
          </div>
        </div>
      </TableCell>

      {/* 작성자 */}
      <TableCell className="w-[150px]">
        <div
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onUserClick?.(post.userId)}
        >
          {post.author?.image && (
            <img src={post.author.image} alt={post.author.username} className="w-8 h-8 rounded-full object-cover" />
          )}
          <span className="truncate">{post.author?.username || "Unknown"}</span>
        </div>
      </TableCell>

      {/* 반응 (좋아요/싫어요) */}
      <TableCell className="w-[150px]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium">{post.reactions?.likes || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <ThumbsDown className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium">{post.reactions?.dislikes || 0}</span>
          </div>
        </div>
      </TableCell>

      {/* 작업 (버튼) */}
      <TableCell className="w-[150px]">
        <div className="flex items-center gap-2">{actions}</div>
      </TableCell>
    </TableRow>
  )
}
