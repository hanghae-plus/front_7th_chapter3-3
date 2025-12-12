import { Edit, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { TableCell, TableRow } from "@/shared/ui"
import type { PostWithAuthor } from "../model/types"

interface PostTableRowProps {
  post: PostWithAuthor
  onEdit: () => void
  onDelete: () => void
  onViewDetail: () => void
  onViewUser: () => void
}

export function PostTableRow({ post, onEdit, onDelete, onViewDetail, onViewUser }: PostTableRowProps) {
  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <span className="cursor-pointer hover:underline" onClick={onViewDetail}>
          {post.title}
        </span>
      </TableCell>
      <TableCell>
        <span className="cursor-pointer hover:underline" onClick={onViewUser}>
          {post.author?.username}
        </span>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions?.likes ?? 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions?.dislikes ?? 0}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <button onClick={onViewDetail} className="p-1 hover:bg-gray-100 rounded">
            <MessageSquare className="w-4 h-4" />
          </button>
          <button onClick={onEdit} className="p-1 hover:bg-gray-100 rounded">
            <Edit className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="p-1 hover:bg-gray-100 rounded text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </TableCell>
    </TableRow>
  )
}
