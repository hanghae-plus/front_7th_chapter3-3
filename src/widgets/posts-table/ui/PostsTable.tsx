import { useEffect } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/shared/ui/buttons"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/ui/tables"
import { Post, usePostStore, PostRow } from "@/entities/post"
import { useTagStore } from "@/entities/tag"
import { useUserStore } from "@/entities/user"
import { useUiStore } from "@/shared/model"
import { SearchInput, TagFilter, SortControls } from "@/features/search-posts"
import { Pagination } from "@/widgets/pagination"

export const PostsTable = () => {
  const { posts, total, loading, fetchPosts, searchPosts, fetchPostsByTag, deletePost, setSelectedPost } =
    usePostStore()
  const { selectedTag, setSelectedTag } = useTagStore()
  const { fetchUser } = useUserStore()
  const {
    skip,
    limit,
    searchQuery,
    sortBy,
    sortOrder,
    setSkip,
    setLimit,
    setShowAddDialog,
    setShowEditDialog,
    setShowPostDetailDialog,
    setShowUserModal,
  } = useUiStore()

  // 검색 모드
  useEffect(() => {
    if (searchQuery) {
      searchPosts(searchQuery)
    }
  }, [searchQuery, searchPosts])

  // 태그 필터 모드
  useEffect(() => {
    if (!searchQuery && selectedTag && selectedTag !== "all") {
      fetchPostsByTag(selectedTag)
    }
  }, [searchQuery, selectedTag, fetchPostsByTag])

  // 기본 모드 (페이지네이션/정렬 포함)
  useEffect(() => {
    if (!searchQuery && (!selectedTag || selectedTag === "all")) {
      fetchPosts(limit, skip, sortBy, sortOrder)
    }
  }, [searchQuery, selectedTag, skip, limit, sortBy, sortOrder, fetchPosts])

  const handleOpenDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  const handleEdit = (post: Post) => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  const handleUserClick = (userId: number) => {
    setShowUserModal(true)
    fetchUser(userId)
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">게시물 관리자</h2>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          게시물 추가
        </Button>
      </div>

      {/* 검색 및 필터 컨트롤 */}
      <div className="flex gap-4">
        <SearchInput />
        <TagFilter />
        <SortControls />
      </div>

      {/* 게시물 테이블 */}
      {loading ? (
        <div className="flex justify-center p-4">로딩 중...</div>
      ) : posts.length === 0 ? (
        <div className="flex justify-center p-8 text-muted-foreground">
          게시물이 없습니다.
        </div>
      ) : (
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
              <PostRow
                key={post.id}
                post={post}
                searchQuery={searchQuery}
                selectedTag={selectedTag}
                onTagClick={handleTagClick}
                onDetailClick={() => handleOpenDetail(post)}
                onEditClick={() => handleEdit(post)}
                onDeleteClick={() => deletePost(post.id)}
                onUserClick={() => post.author && handleUserClick(post.author.id)}
              />
            ))}
          </TableBody>
        </Table>
      )}

      {/* 페이지네이션 */}
      <Pagination
        skip={skip}
        limit={limit}
        total={total}
        onSkipChange={setSkip}
        onLimitChange={setLimit}
      />
    </div>
  )
}
