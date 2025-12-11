import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui"
import { Post, postQueries } from "@/entities/post"
import { CreatePostDialog } from "@/features/post/create-post"
import { ViewUserInfoDialog } from "@/features/user/view-user-info"
import { PostsFilterPanel, PostsTable, PostDetailDialog, Pagination } from "@/widgets/index"
import { useOverlay } from "@/shared/lib/overlay"

const PostsManagerPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const overlay = useOverlay()

  // URL 파라미터에서 상태 추출 (페이지네이션 및 데이터 패칭용)
  const skip = parseInt(searchParams.get("skip") || "0")
  const limit = parseInt(searchParams.get("limit") || "10")
  const searchQuery = searchParams.get("search") || ""
  const selectedTag = searchParams.get("tag") || ""

  // 게시물 조회 (검색어, 태그, 페이지네이션 고려)
  // 검색어가 있을 때
  const searchResult = useQuery({
    ...postQueries.search(searchQuery),
    enabled: !!searchQuery,
  })

  // 태그가 선택되었을 때
  const tagResult = useQuery({
    ...postQueries.listByTag(selectedTag),
    enabled: !!selectedTag && !searchQuery,
  })

  // 기본 목록
  const listResult = useQuery({
    ...postQueries.list({ limit, skip }),
    enabled: !searchQuery && !selectedTag,
  })

  // 활성화된 쿼리 결과 선택
  const postsData = searchQuery ? searchResult.data : selectedTag ? tagResult.data : listResult.data
  const isLoading = searchQuery ? searchResult.isLoading : selectedTag ? tagResult.isLoading : listResult.isLoading

  const posts = postsData?.posts || []
  const total = postsData?.total || 0

  // ===== 이벤트 핸들러 =====

  const updateSearchParams = (updates: Record<string, string | number>) => {
    const newParams = new URLSearchParams(searchParams)

    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, String(value))
      } else {
        newParams.delete(key)
      }
    })

    setSearchParams(newParams)
  }

  const handleSkipChange = (newSkip: number) => {
    updateSearchParams({ skip: newSkip })
  }

  const handleLimitChange = (newLimit: number) => {
    updateSearchParams({ limit: newLimit, skip: 0 })
  }

  const handlePostDetailClick = (post: Post) => {
    overlay.open((controller) => <PostDetailDialog post={post} controller={controller} />)
  }

  const handleUserClick = (userId: number) => {
    overlay.open((controller) => <ViewUserInfoDialog userId={userId} controller={controller} />)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <CreatePostDialog onSuccess={() => {}} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostsFilterPanel />

          {/* 게시물 테이블 */}
          {isLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostsTable
              posts={posts}
              onUserClick={handleUserClick}
              onPostDetailClick={handlePostDetailClick}
              onPostsUpdate={() => {}}
            />
          )}

          {/* 페이지네이션 */}
          <Pagination
            skip={skip}
            limit={limit}
            total={total}
            onSkipChange={handleSkipChange}
            onLimitChange={handleLimitChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default PostsManagerPage
