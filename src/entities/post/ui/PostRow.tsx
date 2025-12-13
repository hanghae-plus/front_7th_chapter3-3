import { memo } from "react"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Post } from "../types"
import { Button } from "@/components"
import { TableCell, TableRow } from "@/shared/ui/tables"
import { TagBadge } from "@/entities/tag/ui/TagBadge"
import { UserAvatar } from "@/entities/user/ui/UserAvatar"
import { highlightText } from "@/shared/lib"

interface PostRowProps {
  post: Post
  searchQuery: string
  selectedTag: string
  onTagClick: (tag: string) => void
  onDetailClick: () => void
  onEditClick: () => void
  onDeleteClick: () => void
  onUserClick: () => void
}

export const PostRow = memo(({
  post,
  searchQuery,
  selectedTag,
  onTagClick,
  onDetailClick,
  onEditClick,
  onDeleteClick,
  onUserClick,
}: PostRowProps) => {
  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>
          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => (
              <TagBadge
                key={tag}
                tag={tag}
                isSelected={selectedTag === tag}
                onClick={() => onTagClick(tag)}
              />
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        {post.author && (
          <UserAvatar user={post.author} onClick={onUserClick} />
        )}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions?.likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onDetailClick}>
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onEditClick}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onDeleteClick}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
})
