import { ThumbsDown, ThumbsUp, MessageSquare, Edit2, Trash2 } from "lucide-react"
import type { Post } from '../model/types'
import { highlightText } from '../../../shared/lib'
import { Button, TableCell, TableRow } from '../../../shared/ui'
import { PostTag } from './PostTag'
import { PostAuthor } from './PostAuthor'

interface PostRowProps {
  post: Post
  searchQuery?: string
  selectedTag?: string
  onPostDetail: (post: Post) => void
  onPostEdit: (post: Post) => void
  onPostDelete: (postId: number) => void
  onUserClick: (author: Post['author']) => void
  onTagClick: (tag: string) => void
}

/**
 * 게시물 테이블 행 컴포넌트
 * 게시물 정보를 테이블 행 형태로 표시합니다.
 */
export const PostRow = ({
  post,
  searchQuery = "",
  selectedTag,
  onPostDetail,
  onPostEdit,
  onPostDelete,
  onUserClick,
  onTagClick,
}: PostRowProps) => {
  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>
          <div className="flex flex-wrap gap-1">
            {post.tags?.map((tag) => (
              <PostTag
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
          <PostAuthor
            author={post.author}
            onClick={() => onUserClick(post.author)}
          />
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
          <Button variant="ghost" size="sm" onClick={() => onPostDetail(post)}>
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onPostEdit(post)}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onPostDelete(post.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}

