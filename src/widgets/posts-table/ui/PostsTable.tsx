import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Button } from '@/shared/ui'
import { Post } from '@/entities/post/model/types'
import { PostCard } from '@/entities/post/ui/PostCard'
import { MessageSquare, Edit2, Trash2, ThumbsUp, ThumbsDown } from 'lucide-react'

interface PostsTableProps {
  posts: Post[]
  searchQuery: string
  onPostDetail: (post: Post) => void
  onPostEdit: (post: Post) => void
  onPostDelete: (post: Post) => void
  onTagClick: (tag: string) => void
  onAuthorClick: (author: any) => void
}

export const PostsTable = ({
  posts,
  searchQuery,
  onPostDetail,
  onPostEdit,
  onPostDelete,
  onTagClick,
  onAuthorClick,
}: PostsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <PostCard post={post} searchQuery={searchQuery} onTagClick={onTagClick} />
            </TableCell>
            <TableCell>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => onAuthorClick(post.author)}
              >
                <img
                  src={post.author?.image}
                  alt={post.author?.username}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm">{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-sm">{post.reactions?.likes || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown className="w-4 h-4" />
                  <span className="text-sm">{post.reactions?.dislikes || 0}</span>
                </div>
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
                <Button variant="ghost" size="sm" onClick={() => onPostDelete(post)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
