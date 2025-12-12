import { Post } from '../model/types'
import { highlightText } from '@/shared/lib/highlight'

interface PostCardProps {
  post: Post
  searchQuery?: string
  onTagClick?: (tag: string) => void
}

export const PostCard = ({ post, searchQuery = '', onTagClick }: PostCardProps) => {
  return (
    <div className="space-y-1">
      <div>{highlightText(post.title, searchQuery)}</div>
      <div className="flex flex-wrap gap-1">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer text-blue-800 bg-blue-100 hover:bg-blue-200"
            onClick={() => onTagClick?.(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
