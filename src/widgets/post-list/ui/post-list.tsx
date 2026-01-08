/**
 * Post List Widget UI
 * 
 * 게시물 목록 위젯 컴포넌트
 * 여러 features를 조합하여 게시물 목록을 표시
 */

import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../shared/ui"
import { usePostStore } from "../../../entities/post/model"
import { usePostEdit } from "../../../features/post-edit/model"
import { usePostDelete } from "../../../features/post-delete/model"
import { useUserView } from "../../../features/user-view/model"
import { useUIStore } from "../../../shared/lib/stores"
import { highlightText } from "../../../shared/lib/text-utils"
import type { Post } from "../../../entities/post/model"

/**
 * 게시물 목록 위젯
 */
export function PostList() {
  const { posts, searchQuery, selectedTag, setSelectedTag } = usePostStore()
  const { openEditDialog } = usePostEdit()
  const { handleDeletePost } = usePostDelete()
  const { handleViewUser } = useUserView()
  const { setShowPostDetailDialog } = useUIStore()

  const openPostDetail = (post: Post) => {
    usePostStore.getState().setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
    // URL 업데이트는 페이지에서 처리
  }

  const handleUserClick = async (userId: number) => {
    // 유효하지 않은 사용자 ID인 경우 처리하지 않음
    if (!userId || userId === 0) {
      console.warn("유효하지 않은 사용자 ID:", userId)
      return
    }
    
    try {
      await handleViewUser(userId)
    } catch (error) {
      console.error("사용자 정보 조회 오류:", error)
      // 사용자에게 에러 메시지를 표시할 수 있도록 에러 처리 개선 가능
    }
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
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => handleTagClick(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80"
                onClick={() => handleUserClick(post.author?.id || 0)}
              >
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
                <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => openEditDialog(post)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
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

