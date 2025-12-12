import { Post } from "@/entities/post"
import { CreatePostDialog } from "@/features/post/create-post"
import { ViewUserInfoDialog } from "@/features/user/view-user-info"
import { PostsFilterPanel } from "@/widgets/PostsFilterPanel"
import { PostTable } from "@/widgets/PostTable"
import { PostDetailDialog } from "@/widgets/PostDetailDialog"
import { useOverlay } from "@/shared/lib/overlay"
import { Card, CardContent } from "../shared"

export const PostsManager = () => {
  const overlay = useOverlay()

  // Overlay 핸들러 (위젯 조합 로직)
  const handlePostDetailClick = (post: Post) => {
    overlay.open((controller) => <PostDetailDialog post={post} controller={controller} />)
  }

  const handleUserClick = (userId: number) => {
    overlay.open((controller) => <ViewUserInfoDialog userId={userId} controller={controller} />)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">
          {/* 헤더 영역 */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">게시물 관리자</h2>
            <CreatePostDialog />
          </div>

          {/* 검색 및 필터 컨트롤 */}
          <PostsFilterPanel />

          {/* 게시물 테이블 (with pagination) */}
          <PostTable onUserClick={handleUserClick} onPostDetailClick={handlePostDetailClick} />
        </div>
      </CardContent>
    </Card>
  )
}
