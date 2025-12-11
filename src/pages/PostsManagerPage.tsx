import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui"
import { Post, postQueries } from "@/entities/post"
import { userQueries } from "@/entities/user"
import { tagQueries } from "@/entities/tag"
import { CreatePostDialog } from "@/features/create-post"
import { ViewUserInfoDialog } from "@/features/view-user-info"
import { PostsFilterPanel, PostsTable, PostDetailDialog, Pagination } from "@/widgets/index"

const PostsManagerPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // URL 파라미터에서 상태 추출
  const skip = parseInt(searchParams.get("skip") || "0")
  const limit = parseInt(searchParams.get("limit") || "10")
  const searchQuery = searchParams.get("search") || ""
  const selectedTag = searchParams.get("tag") || ""
  const sortBy = searchParams.get("sortBy") || ""
  const sortOrder = searchParams.get("sortOrder") || "asc"

  // UI 상태 (다이얼로그 관리)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  // ===== TanStack Query로 데이터 패칭 =====

  // 1. 태그 목록 조회
  const { data: tags = [] } = useQuery(tagQueries.list())

  // 2. 사용자 목록 조회 (author 정보용)
  const { data: usersData } = useQuery(userQueries.list({ limit: 0, select: "username,image" }))

  // 3. 게시물 조회 (검색어, 태그, 페이지네이션 고려)
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

  // 게시물 + 사용자 정보 조합 (useMemo로 최적화)
  const posts = useMemo(() => {
    if (!postsData || !usersData) return []

    return postsData.posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId),
    }))
  }, [postsData, usersData])

  const total = postsData?.total || 0

  // ===== URL 업데이트 함수 =====

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

  // ===== 이벤트 핸들러 =====

  const handleSearch = (query: string) => {
    updateSearchParams({
      search: query,
      skip: 0, // 검색 시 첫 페이지로
      tag: "", // 검색 시 태그 필터 제거
    })
  }

  const handleTagChange = (tag: string) => {
    updateSearchParams({
      tag,
      skip: 0, // 태그 변경 시 첫 페이지로
      search: "", // 태그 선택 시 검색어 제거
    })
  }

  const handleSortByChange = (newSortBy: string) => {
    updateSearchParams({ sortBy: newSortBy })
  }

  const handleSortOrderChange = (newSortOrder: string) => {
    updateSearchParams({ sortOrder: newSortOrder })
  }

  const handleSkipChange = (newSkip: number) => {
    updateSearchParams({ skip: newSkip })
  }

  const handleLimitChange = (newLimit: number) => {
    updateSearchParams({ limit: newLimit, skip: 0 })
  }

  const handlePostDetailClick = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId)
    setShowUserModal(true)
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
          <PostsFilterPanel
            searchQuery={searchQuery}
            selectedTag={selectedTag}
            sortBy={sortBy}
            sortOrder={sortOrder}
            tags={tags}
            onSearch={handleSearch}
            onTagChange={handleTagChange}
            onSortByChange={handleSortByChange}
            onSortOrderChange={handleSortOrderChange}
          />

          {/* 게시물 테이블 */}
          {isLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostsTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              onTagClick={handleTagChange}
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

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        post={selectedPost}
        open={showPostDetailDialog}
        searchQuery={searchQuery}
        onOpenChange={setShowPostDetailDialog}
      />

      {/* 사용자 모달 */}
      <ViewUserInfoDialog userId={selectedUserId} open={showUserModal} onOpenChange={setShowUserModal} />
    </Card>
  )
}

export default PostsManagerPage
