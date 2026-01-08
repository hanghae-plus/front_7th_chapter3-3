import { useEffect } from "react"
import { Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, Button } from "../shared/ui"
import { PostList } from "../widgets/post-list/ui"
import { PostSearch } from "../features/post-search/ui"
import { PostFilter } from "../features/post-filter/ui"
import { PostPagination } from "../features/post-pagination/ui"
import { PostCreateDialog } from "../features/post-create/ui"
import { PostEditDialog } from "../features/post-edit/ui"
import { PostDetailDialog } from "../widgets/post-detail/ui"
import { CommentCreateDialog } from "../features/comment-create/ui"
import { CommentEditDialog } from "../features/comment-edit/ui"
import { UserViewModal } from "../features/user-view/ui"
import { usePostStore } from "../entities/post/model"
import { usePostCreate } from "../features/post-create/model"

/**
 * 게시물 관리 페이지
 *
 * Widgets와 Features를 조합하여 구성된 페이지 컴포넌트
 */
const PostsManager = () => {
  const { fetchPosts, loading } = usePostStore()
  const { openAddDialog } = usePostCreate()

  // 초기 데이터 로드
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={openAddDialog}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <PostSearch />
            </div>
            <PostFilter />
          </div>

          {/* 게시물 목록 */}
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostList />}

          {/* 페이지네이션 */}
          <PostPagination />
        </div>
      </CardContent>

      {/* Feature Dialogs */}
      <PostCreateDialog />
      <PostEditDialog />
      <PostDetailDialog />
      <CommentCreateDialog />
      <CommentEditDialog />
      <UserViewModal />
    </Card>
  )
}

export default PostsManager
