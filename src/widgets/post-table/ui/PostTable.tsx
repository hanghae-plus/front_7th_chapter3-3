import { useState } from "react"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui"
import { PostEditDialog } from "@/features/post-edit/ui/PostEditDialog"
import { useMutationPostDelete, useMutationPostLike, useMutationPostDislike } from "@/entities/post/model/usePost"
import { highlightText } from "@/shared/lib/highlight"
import { useAtom } from "jotai"
import { searchQueryAtom, selectedTagAtom } from "@/features/post-search/model/store"
import type { Post } from "@/shared/types"

interface PostTableProps {
  posts: Post[]
  onPostDetail: (post: Post) => void
  onUserClick: (userId: number) => void
}

export const PostTable = ({ posts, onPostDetail, onUserClick }: PostTableProps) => {
  const [searchQuery] = useAtom(searchQueryAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const [editPost, setEditPost] = useState<Post | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const { mutate: deletePost } = useMutationPostDelete()
  const { mutate: likePost } = useMutationPostLike()
  const { mutate: dislikePost } = useMutationPostDislike()

  const handleEdit = (post: Post) => {
    setEditPost(post)
    setShowEditDialog(true)
  }

  return (
    <>
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
                <div className="space-y-1">
                  <div>{highlightText(post.title, searchQuery)}</div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                          selectedTag === tag
                            ? "text-white bg-blue-500 hover:bg-blue-600"
                            : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                        }`}
                        onClick={() => setSelectedTag(tag)}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onUserClick(post.userId)}>
                  <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                  <span>{post.author?.username}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => likePost({ id: post.id, likes: post.reactions?.likes || 0 })}
                    className="flex items-center gap-1"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span>{post.reactions?.likes || 0}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dislikePost({ id: post.id, dislikes: post.reactions?.dislikes || 0 })}
                    className="flex items-center gap-1"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span>{post.reactions?.dislikes || 0}</span>
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onPostDetail(post)}>
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(post)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PostEditDialog post={editPost} open={showEditDialog} onOpenChange={setShowEditDialog} />
    </>
  )
}
