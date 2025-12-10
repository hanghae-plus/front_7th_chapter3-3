import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui"
import { Post, fetchPosts, fetchPostsByTag, searchPosts } from "@/entities/post"
import { fetchUsers } from "@/entities/user"
import { Tag, fetchTags } from "@/entities/tag"
import { CreatePostDialog } from "@/features/create-post"
import { ViewUserInfoDialog } from "@/features/view-user-info"
import { PostsFilterPanel } from "@/widgets/posts-filter-panel"
import { PostsTable } from "@/widgets/posts-table"
import { PostDetailDialog } from "@/widgets/post-detail-dialog"
import { Pagination } from "@/widgets/pagination"

const PostsManagerPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 상태 관리
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState<Tag[]>([])
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 게시물 가져오기
  const loadPosts = async () => {
    setLoading(true)
    try {
      const postsData = await fetchPosts({ limit, skip })
      const usersData = await fetchUsers({ limit: 0, select: "username,image" })

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 태그별 게시물 가져오기
  const loadPostsByTag = async (tag: string) => {
    if (!tag || tag === "all") {
      loadPosts()
      return
    }
    setLoading(true)
    try {
      const [postsData, usersData] = await Promise.all([
        fetchPostsByTag(tag),
        fetchUsers({ limit: 0, select: "username,image" }),
      ])

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      setPosts(postsWithUsers)
      setTotal(postsData.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 게시물 검색
  const handleSearch = async (query: string) => {
    setSearchQuery(query)
    if (!query) {
      loadPosts()
      return
    }
    setLoading(true)
    try {
      const data = await searchPosts(query)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  // 태그 변경 핸들러
  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    loadPostsByTag(tag)
    updateURL()
  }

  // 게시물 상세 보기
  const handlePostDetailClick = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  // 사용자 정보 보기
  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId)
    setShowUserModal(true)
  }

  // 초기 로드
  useEffect(() => {
    fetchTags()
      .then(setTags)
      .catch((error) => console.error("태그 가져오기 오류:", error))
  }, [])

  useEffect(() => {
    if (selectedTag) {
      loadPostsByTag(selectedTag)
    } else {
      loadPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <CreatePostDialog onSuccess={loadPosts} />
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
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
          />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostsTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              onTagClick={handleTagChange}
              onUserClick={handleUserClick}
              onPostDetailClick={handlePostDetailClick}
              onPostsUpdate={loadPosts}
            />
          )}

          {/* 페이지네이션 */}
          <Pagination skip={skip} limit={limit} total={total} onSkipChange={setSkip} onLimitChange={setLimit} />
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
