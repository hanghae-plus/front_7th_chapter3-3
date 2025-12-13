import { useEffect } from "react"
import { Plus } from "lucide-react"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/ui/tables"
import { usePostStore } from "@/entities/post"
import { PostRow } from "@/entities/post/ui"
import { useTagStore } from "@/entities/tag"
import { useUserStore } from "@/entities/user"
import { useUiStore } from "@/shared/model"
import { SearchInput, TagFilter, SortControls } from "@/features/search-posts"

export const PostsTable = () => {
  const { posts, total, loading, fetchPosts, fetchPostsByTag, deletePost, setSelectedPost } =
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

  useEffect(() => {
    if (selectedTag && selectedTag !== "all") {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts(limit, skip)
    }
  }, [skip, limit, selectedTag, sortBy, sortOrder])

  const handleOpenDetail = (post: typeof posts[0]) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  const handleEdit = (post: typeof posts[0]) => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  const handleUserClick = async (userId: number) => {
    await fetchUser(userId)
    setShowUserModal(true)
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
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span>표시</span>
          <Select value={limit.toString()} onValueChange={(value) => setLimit(Number(value))}>
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
          <Button disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - limit))}>
            이전
          </Button>
          <Button disabled={skip + limit >= total} onClick={() => setSkip(skip + limit)}>
            다음
          </Button>
        </div>
      </div>
    </div>
  )
}
