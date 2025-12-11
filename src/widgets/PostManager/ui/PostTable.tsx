import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Button } from "@/shared/ui"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { highlightText } from "@/shared/lib/highlight"
import { usePostListStore } from "@/features/post-list/model/store"
import { Post } from "@/entities/post/model/types"

// Props 인터페이스 100% 유지
interface Props {
  posts: Post[]
  searchQuery?: string
  onEdit?: (post: Post) => void
  onDelete?: (id: number) => void
  onOpenDetail?: (post: Post) => void
  onOpenUser?: (user: any) => void
  onLike?: (post: Post) => void
  onDislike?: (post: Post) => void
}

export const PostTable = ({
  posts,
  searchQuery = "",
  onEdit,
  onDelete,
  onOpenDetail,
  onOpenUser,
  onLike,
  onDislike,
}: Props) => {
  const { setSelectedTag, selectedTag } = usePostListStore()

  // 작업 컬럼 표시 여부 결정 (하나라도 핸들러가 있으면 표시)
  const showActions = onEdit || onDelete || onOpenDetail

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          {/* 작업 컬럼 헤더: 핸들러가 없으면(대시보드 등) 숨김 */}
          {showActions && <TableHead className="w-[150px]">작업</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>

            {/* 제목 & 태그 */}
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

            {/* 작성자 */}
            <TableCell>
              <div
                className={`flex items-center space-x-2 ${onOpenUser ? "cursor-pointer" : ""}`}
                onClick={() => {
                  if (post.author) onOpenUser?.(post.author)
                }}
              >
                {post.author ? (
                  <>
                    <img src={post.author.image} alt={post.author.username} className="w-8 h-8 rounded-full" />
                    <span>{post.author.username}</span>
                  </>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-400 cursor-not-allowed">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">?</div>
                    <span>알 수 없음</span>
                  </div>
                )}
              </div>
            </TableCell>

            {/* 반응 */}
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLike?.(post)}
                  className={!onLike ? "pointer-events-none" : ""}
                >
                  <ThumbsUp className="w-4 h-4 text-blue-500" />
                  <span className="ml-1">{post.reactions?.likes || 0}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDislike?.(post)}
                  className={!onDislike ? "pointer-events-none" : ""}
                >
                  <ThumbsDown className="w-4 h-4 text-red-500" />
                  <span className="ml-1">{post.reactions?.dislikes || 0}</span>
                </Button>
              </div>
            </TableCell>

            {/* 작업 버튼들 구현 (조건부 렌더링) */}
            {showActions && (
              <TableCell>
                <div className="flex items-center gap-2">
                  {onOpenDetail && (
                    <Button variant="ghost" size="sm" onClick={() => onOpenDetail(post)}>
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  )}
                  {onEdit && (
                    <Button variant="ghost" size="sm" onClick={() => onEdit(post)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                  )}
                  {onDelete && (
                    <Button variant="ghost" size="sm" onClick={() => onDelete(post.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
