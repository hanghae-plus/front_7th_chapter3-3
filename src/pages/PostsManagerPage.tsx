import { useEffect, useMemo } from "react"
import { Plus } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui"
import { useUIStore } from "@/shared/store"
import { usePosts, useSearchPosts, usePostsByTag, type PostWithAuthor } from "@/entities/post"
import { useUsers } from "@/entities/user"
import {
  AddPostDialog,
  EditPostDialog,
  AddCommentDialog,
  EditCommentDialog,
  PostSearchInput,
  TagFilter,
  SortFilter,
  Pagination,
  useFilterStore,
  usePaginationStore,
} from "@/features"
import { PostsTable, PostDetailDialog, UserProfileDialog } from "@/widgets"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Stores
  const { skip, limit, setSkip, setLimit } = usePaginationStore()
  const { searchQuery, selectedTag, sortBy, sortOrder, setSearchQuery, setSelectedTag, setSortBy, setSortOrder } =
    useFilterStore()
  const { openAddPostDialog, openUserModal, selectedPost } = useUIStore()

  // URL sync - read from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const urlSkip = params.get("skip")
    const urlLimit = params.get("limit")
    const urlSearch = params.get("search")
    const urlTag = params.get("tag")
    const urlSortBy = params.get("sortBy")
    const urlSortOrder = params.get("sortOrder")

    if (urlSkip) setSkip(parseInt(urlSkip))
    if (urlLimit) setLimit(parseInt(urlLimit))
    if (urlSearch) setSearchQuery(urlSearch)
    if (urlTag) setSelectedTag(urlTag)
    if (urlSortBy) setSortBy(urlSortBy)
    if (urlSortOrder) setSortOrder(urlSortOrder as "asc" | "desc")
  }, [])

  // URL sync - write to URL on state change
  useEffect(() => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit !== 10) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (selectedTag) params.set("tag", selectedTag)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder !== "asc") params.set("sortOrder", sortOrder)
    navigate(`?${params.toString()}`, { replace: true })
  }, [skip, limit, searchQuery, selectedTag, sortBy, sortOrder, navigate])

  // Data fetching
  const { data: postsData, isLoading: isLoadingPosts } = usePosts({ skip, limit })
  const { data: searchData } = useSearchPosts(searchQuery)
  const { data: tagData } = usePostsByTag(selectedTag && selectedTag !== "all" ? selectedTag : "")
  const { data: usersData } = useUsers()

  // Determine which posts to show
  const posts = useMemo(() => {
    let basePosts: PostWithAuthor[] = []

    if (searchQuery && searchData?.posts) {
      basePosts = searchData.posts as PostWithAuthor[]
    } else if (selectedTag && selectedTag !== "all" && tagData?.posts) {
      basePosts = tagData.posts as PostWithAuthor[]
    } else if (postsData?.posts) {
      basePosts = postsData.posts as PostWithAuthor[]
    }

    // Add author information
    const postsWithAuthors = basePosts.map((post) => ({
      ...post,
      author: usersData?.users?.find((user) => user.id === post.userId),
    }))

    return postsWithAuthors
  }, [searchQuery, searchData, selectedTag, tagData, postsData, usersData])

  const total = useMemo(() => {
    if (searchQuery && searchData) return searchData.total
    if (selectedTag && selectedTag !== "all" && tagData) return tagData.total
    return postsData?.total || 0
  }, [searchQuery, searchData, selectedTag, tagData, postsData])

  const handleSearch = () => {
    // Search is triggered automatically via useSearchPosts when searchQuery changes
    // This function is for Enter key press
  }

  const handleOpenUserModal = (userId: number) => {
    openUserModal(userId)
  }

  const isLoading = isLoadingPosts

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={openAddPostDialog}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <PostSearchInput onSearch={handleSearch} />
            <TagFilter />
            <SortFilter />
          </div>

          {/* 게시물 테이블 */}
          {isLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostsTable posts={posts} onOpenUserModal={handleOpenUserModal} />
          )}

          {/* 페이지네이션 */}
          <Pagination total={total} />
        </div>
      </CardContent>

      {/* Dialogs */}
      <AddPostDialog />
      <EditPostDialog />
      <AddCommentDialog postId={selectedPost?.id || null} />
      <EditCommentDialog />
      <PostDetailDialog />
      <UserProfileDialog />
    </Card>
  )
}

export default PostsManager
