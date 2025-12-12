import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAtom } from "jotai"
import { Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Button } from "@/shared/ui"
import { PostSearchBar } from "@/features/post-search/ui/PostSearchBar"
import { PostAddDialog } from "@/features/post-add/ui/PostAddDialog"
import { PostTable } from "@/widgets/post-table/ui/PostTable"
import { PostDetail } from "@/widgets/post-detail/ui/PostDetail"
import { UserModal } from "@/widgets/user-modal/ui/UserModal"
import { useQueryPosts, useQueryPostsSearch, useQueryPostsByTag } from "@/entities/post/model/usePost"
import { useQueryTags } from "@/entities/tag/model/useTag"
import { useQueryUsers } from "@/entities/user/model/useUser"
import { searchQueryAtom, selectedTagAtom, sortByAtom, sortOrderAtom, paginationAtom } from "@/features/post-search/model/store"
import type { Post } from "@/shared/types"

const PostsManagerPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)
  const [pagination, setPagination] = useAtom(paginationAtom)

  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [isSearchMode, setIsSearchMode] = useState(false)

  // Queries
  const { data: tagsData } = useQueryTags()
  const { data: usersData } = useQueryUsers()
  const { data: postsData, isLoading: isPostsLoading } = useQueryPosts({
    ...pagination,
    enabled: !selectedTag && !isSearchMode,
  })
  const { data: searchData, isLoading: isSearchLoading } = useQueryPostsSearch(searchQuery)
  const { data: tagData, isLoading: isTagLoading } = useQueryPostsByTag(selectedTag)

  // URL sync
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setPagination({
      skip: parseInt(params.get("skip") || "0"),
      limit: parseInt(params.get("limit") || "10"),
    })
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder((params.get("sortOrder") as "asc" | "desc") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  useEffect(() => {
    const params = new URLSearchParams()
    if (pagination.skip) params.set("skip", pagination.skip.toString())
    if (pagination.limit) params.set("limit", pagination.limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    
    const newSearch = params.toString()
    const currentSearch = location.search.slice(1) // Remove '?'
    
    // URL이 실제로 변경된 경우에만 navigate
    if (newSearch !== currentSearch) {
      navigate(`?${newSearch}`, { replace: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, sortBy, sortOrder, selectedTag, searchQuery])

  const handleSearch = () => {
    if (searchQuery) {
      setIsSearchMode(true)
      setSelectedTag("")
    } else {
      setIsSearchMode(false)
    }
  }

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    setIsSearchMode(false)
    setSearchQuery("")
    if (tag === "all") {
      setSelectedTag("")
    }
  }

  const handlePostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId)
    setShowUserModal(true)
  }

  // Get current posts based on mode
  const getCurrentPosts = () => {
    let posts: Post[] = []
    if (isSearchMode && searchData) {
      posts = searchData.posts
    } else if (selectedTag && tagData) {
      posts = tagData.posts
    } else {
      posts = postsData?.posts || []
    }

    // 사용자 데이터와 병합
    if (usersData?.users) {
      return posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))
    }
    return posts
  }

  const getCurrentTotal = () => {
    if (isSearchMode && searchData) {
      return searchData.total
    }
    if (selectedTag && tagData) {
      return tagData.total
    }
    return postsData?.total || 0
  }

  const loading = isPostsLoading || isSearchLoading || isTagLoading

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <PostAddDialog />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* Search and Filter Controls */}
          <div className="flex gap-4">
            <PostSearchBar onSearch={handleSearch} />
            <Select value={selectedTag} onValueChange={handleTagChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="태그 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 태그</SelectItem>
                {tagsData?.map((tag) => (
                  <SelectItem key={tag.url} value={tag.slug}>
                    {tag.slug}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 기준" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">없음</SelectItem>
                <SelectItem value="id">ID</SelectItem>
                <SelectItem value="title">제목</SelectItem>
                <SelectItem value="reactions">반응</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as "asc" | "desc")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="정렬 순서" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">오름차순</SelectItem>
                <SelectItem value="desc">내림차순</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Posts Table */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable posts={getCurrentPosts()} onPostDetail={handlePostDetail} onUserClick={handleUserClick} />
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <Select
                value={pagination.limit.toString()}
                onValueChange={(value) => setPagination({ ...pagination, limit: Number(value) })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="30">30</SelectItem>
                </SelectContent>
              </Select>
              <span>항목</span>
            </div>
            <div className="flex gap-2">
              <Button
                disabled={pagination.skip === 0}
                onClick={() =>
                  setPagination({
                    ...pagination,
                    skip: Math.max(0, pagination.skip - pagination.limit),
                  })
                }
              >
                이전
              </Button>
              <Button
                disabled={pagination.skip + pagination.limit >= getCurrentTotal()}
                onClick={() =>
                  setPagination({
                    ...pagination,
                    skip: pagination.skip + pagination.limit,
                  })
                }
              >
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Modals */}
      <PostDetail post={selectedPost} open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog} />
      <UserModal userId={selectedUserId} open={showUserModal} onOpenChange={setShowUserModal} />
    </Card>
  )
}

export default PostsManagerPage
