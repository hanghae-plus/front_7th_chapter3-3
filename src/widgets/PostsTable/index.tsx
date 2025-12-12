import { Button } from "@/shared/ui"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/Table"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { type FC } from "react"
import { TPost } from "@/entities/posts/model/types"
import TagBadge from "@/widgets/PostsTable/TagBadge"
import { useSearchFilter } from "@/features/search/model/useSearchFilter"
import { highlightText } from "@/shared/lib/highlightText"
import { useDialogStore } from "@/shared/store/dialogStore"
import { postApi } from "@/entities/posts/api/postApi"

interface IProps {
  posts: TPost[]
  onRemovePost: (postId: number) => void
}

const PostsTable: FC<IProps> = ({ posts, onRemovePost }) => {
  const { searchQuery, selectedTag, setSelectedTag } = useSearchFilter()
  const { openDetailDialog, openEditDialog } = useDialogStore()

  // 삭제 핸들러
  const handleDelete = async (postId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await postApi.deletePost(postId)
      onRemovePost(postId) // 로컬 상태에서 제거
    }
  }

  // 유저 클릭 핸들러 (TODO: useUserModal hook 필요시 분리)
  const handleUserClick = (author: TPost["author"]) => {
    console.log("Open user modal:", author)
    // TODO: useUserModal hook 연결
  }

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
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>
                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <TagBadge
                      key={tag}
                      tag={tag}
                      isSelected={selectedTag === tag}
                      onClick={() => setSelectedTag(tag)}
                    />
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleUserClick(post.author)}>
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
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
                <Button variant="ghost" size="sm" onClick={() => openDetailDialog(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => openEditDialog(post)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(post.id)}>
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

export default PostsTable
