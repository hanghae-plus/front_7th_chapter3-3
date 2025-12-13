import { useState } from "react"
import { Plus, Search } from "lucide-react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared"
import { useTags } from "@/entities/tag/model/tag-queries"
import { PostTable } from "@/entities/post/ui"
import { SelectBox } from "@/widgets/select-box"
import { usePosts } from "@/features/post/model"
import { PostAddDialog, PostEditDialog, PostDetailDialog } from "@/features/post/ui"
import { CommentAddDialog, CommentEditDialog } from "@/features/comment/ui"
import { useComments, usePostComments } from "@/features/comment/model"
import { UserModal } from "@/entities/user/ui"
import { useStore } from "@/shared/store"
import { usePostHandlers, useCommentHandlers, useUserHandlers } from "./PostsManagerPage/hooks"
import { usePostsSearchParams } from "./PostsManagerPage/hooks/usePostsSearchParams"

// PostsFilterBar 컴포넌트
interface PostsFilterBarProps {
  searchInput: string
  selectedTag: string
  sortBy: string
  sortOrder: string
  tags: Array<{ id: number; name: string; slug: string }>
  onSearchInputChange: (value: string) => void
  onSearch: () => void
  onTagChange: (tag: string) => void
  onSortByChange: (sortBy: string) => void
  onSortOrderChange: (sortOrder: string) => void
}

const PostsFilterBar = ({
  searchInput,
  selectedTag,
  sortBy,
  sortOrder,
  tags,
  onSearchInputChange,
  onSearch,
  onTagChange,
  onSortByChange,
  onSortOrderChange,
}: PostsFilterBarProps) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchInput}
            onChange={(e) => onSearchInputChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
          />
        </div>
      </div>
      <SelectBox
        value={selectedTag}
        placeholder="태그 선택"
        options={[{ value: "all", label: "모든 태그" }, ...(tags || []).map((tag) => ({ value: tag.slug, label: tag.slug }))]}
        onValueChange={onTagChange}
      />
      <SelectBox
        value={sortBy}
        placeholder="정렬 기준"
        options={[
          { value: "none", label: "없음" },
          { value: "id", label: "ID" },
          { value: "title", label: "제목" },
          { value: "reactions", label: "반응" },
        ]}
        onValueChange={onSortByChange}
      />
      <SelectBox
        value={sortOrder}
        placeholder="정렬 순서"
        options={[
          { value: "asc", label: "오름차순" },
          { value: "desc", label: "내림차순" },
        ]}
        onValueChange={onSortOrderChange}
      />
    </div>
  )
}

// Pagination 컴포넌트
interface PaginationProps {
  skip: number
  limit: number
  total: number
  onSkipChange: (skip: number) => void
  onLimitChange: (limit: number) => void
}

const Pagination = ({ skip, limit, total, onSkipChange, onLimitChange }: PaginationProps) => {
  const handlePrevious = () => {
    onSkipChange(Math.max(0, skip - limit))
  }

  const handleNext = () => {
    onSkipChange(skip + limit)
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => onLimitChange(Number(value))}>
          <SelectTrigger>
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
        <Button disabled={skip === 0} onClick={handlePrevious}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={handleNext}>
          다음
        </Button>
      </div>
    </div>
  )
}

const PostsManagePage = () => {
  // URL 파라미터 관리 (간소화됨)
  const {
    skip,
    limit,
    searchQuery: urlSearchQuery,
    sortBy,
    sortOrder,
    selectedTag,
    updateParams,
  } = usePostsSearchParams()

  // 로컬 검색 입력 상태
  const [searchInput, setSearchInput] = useState(urlSearchQuery)

  // Zustand 스토어에서 Dialog 상태 가져오기
  const {
    showAddDialog,
    showEditDialog,
    showPostDetailDialog,
    selectedPost,
    setShowAddDialog,
    setShowEditDialog,
    setShowPostDetailDialog,
    setSelectedPost,
    showAddCommentDialog,
    showEditCommentDialog,
    selectedComment,
    currentPostId,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    setSelectedComment,
    setCurrentPostId,
  } = useStore()

  // 게시물 관련 상태 및 훅
  const { posts, total, loading, refetchPosts, searchPosts, addPostToState, removePostFromState } = usePosts({
    skip,
    limit,
    tag: selectedTag,
    search: urlSearchQuery,
  })

  // 댓글 관련 상태 및 훅
  const { loadComments, removeCommentFromState, likeCommentInState } = useComments()
  const currentComments = usePostComments(currentPostId)

  // 사용자 관련 핸들러
  const { showUserModal, setShowUserModal, selectedUser, openUserModal } = useUserHandlers()

  // 게시물 핸들러
  const { handleAddPost, handleUpdatePost, handleDeletePost, openPostDetail } = usePostHandlers({
    refetchPosts,
    setShowAddDialog,
    setShowEditDialog,
    setShowPostDetailDialog,
    setSelectedPost,
    setCurrentPostId,
    loadComments,
    skip,
    limit,
    addPostToState,
    removePostFromState,
  })

  // 댓글 핸들러
  const { handleAddComment, handleUpdateComment, handleDeleteComment, handleLikeComment } = useCommentHandlers({
    currentPostId,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    loadComments,
    removeCommentFromState,
    likeCommentInState,
  })

  const tags = useTags()

  // 검색 실행
  const handleSearch = () => {
    if (searchInput) {
      searchPosts(searchInput)
      updateParams({ search: searchInput })
    }
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostsFilterBar
            searchInput={searchInput}
            selectedTag={selectedTag}
            sortBy={sortBy}
            sortOrder={sortOrder}
            tags={tags}
            onSearchInputChange={setSearchInput}
            onSearch={handleSearch}
            onTagChange={(value) => updateParams({ tag: value })}
            onSortByChange={(value) => updateParams({ sortBy: value })}
            onSortOrderChange={(value) => updateParams({ sortOrder: value })}
          />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={urlSearchQuery}
              selectedTag={selectedTag}
              onSelectTag={(tag) => updateParams({ tag })}
              onOpenUserModal={openUserModal}
              onOpenPostDetail={openPostDetail}
              onEditPost={(post) => {
                setSelectedPost(post)
                setShowEditDialog(true)
              }}
              onDeletePost={handleDeletePost}
            />
          )}

          {/* 페이지네이션 */}
          <Pagination
            skip={skip}
            limit={limit}
            total={total}
            onSkipChange={(newSkip) => updateParams({ skip: newSkip })}
            onLimitChange={(newLimit) => updateParams({ limit: newLimit, skip: 0 })}
          />
        </div>
      </CardContent>

      {/* 게시물 추가 Dialog */}
      <PostAddDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSubmit={handleAddPost} />

      {/* 게시물 수정 Dialog */}
      <PostEditDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        post={selectedPost}
        onPostChange={setSelectedPost}
        onSubmit={() => handleUpdatePost(selectedPost)}
      />

      {/* 게시물 상세 보기 Dialog */}
      <PostDetailDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        post={selectedPost}
        searchQuery={urlSearchQuery}
        comments={currentComments}
        onAddComment={() => setShowAddCommentDialog(true)}
        onLikeComment={handleLikeComment}
        onEditComment={(comment) => {
          setSelectedComment(comment)
          setShowEditCommentDialog(true)
        }}
        onDeleteComment={handleDeleteComment}
      />

      {/* 댓글 추가 Dialog */}
      <CommentAddDialog
        open={showAddCommentDialog}
        onOpenChange={setShowAddCommentDialog}
        onSubmit={handleAddComment}
      />

      {/* 댓글 수정 Dialog */}
      <CommentEditDialog
        open={showEditCommentDialog}
        onOpenChange={setShowEditCommentDialog}
        comment={selectedComment}
        onSubmit={handleUpdateComment}
      />

      {/* 사용자 Modal */}
      <UserModal user={selectedUser} open={showUserModal} onOpenChange={setShowUserModal} />
    </Card>
  )
}

export default PostsManagePage
