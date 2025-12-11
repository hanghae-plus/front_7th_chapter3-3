import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"

import { Post } from "@/entities/post/model/types"
import { User } from "@/entities/user/model/types"

import { getUserDetail } from "@/entities/user/api"

// 1. FSD Layers Import
import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui"
import { usePostListStore } from "@/features/post-list/model/store"
import { usePostListQuery } from "@/features/post-list/model/usePostListQuery.ts"
import { usePostMutations } from "@/features/manage-post/model/usePostMutations"
import { useCommentMutations } from "@/features/manage-comment/model/useCommentMutations"

// 2. Sub-Widgets & Features Import (컴포넌트 분리)
import { PostFilterBar } from "@/features/post-list/ui/PostFilterBar"
import { PostPagination } from "@/features/post-list/ui/PostPagination"
import { PostTable } from "@/widgets/PostManager/ui/PostTable"
import { PostAddDialog } from "@/features/manage-post/ui/PostAddDialog"
import { PostEditDialog } from "@/features/manage-post/ui/PostEditDialog"
import { PostDetailDialog } from "@/widgets/PostManager/ui/PostDetailDialog"
import { UserProfileModal } from "@/entities/user/ui/UserProfileModal"

const PostsManagerPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // --- [1] 상태 관리 (Zustand & Local UI) ---
  // 전역 상태: 필터, 페이지네이션
  const {
    skip,
    limit,
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    setSkip,
    setLimit,
    setSearchQuery,
    setSortBy,
    setSortOrder,
    setSelectedTag,
  } = usePostListStore()

  // UI 상태: 모달 열림/닫힘 (이 페이지에서만 쓰는 UI 상태는 useState 유지 가능)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)

  // 선택된 아이템 상태
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // --- [2] 데이터 페칭 (React Query) ---
  const { data, isLoading } = usePostListQuery()
  const posts = data?.posts || []
  const total = data?.total || 0

  // --- [3] 비즈니스 로직 (Custom Hooks로 분리) ---
  const { addPost, updatePost, deletePost } = usePostMutations()
  const { comments, fetchComments, addComment, updateComment, deleteComment, likeComment } = useCommentMutations()

  // --- [4] URL 동기화 (Effect) ---
  // URL -> 스토어 동기화 (진입 시)
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder((params.get("sortOrder") as "asc" | "desc") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search, setSkip, setLimit, setSearchQuery, setSortBy, setSortOrder, setSelectedTag])

  // 스토어 -> URL 동기화 (변경 시)
  useEffect(() => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag, navigate])

  // --- [5] 이벤트 핸들러 ---
  const handleEditPost = (post: Post) => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  const handleOpenDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id) // 댓글 불러오기 로직 수행
    setShowDetailDialog(true)
  }

  const handleOpenUser = async (user: User) => {
    try {
      // 1. 상세 정보 API 호출
      const detailedUser = await getUserDetail(user.id)

      // 2. 받아온 상세 정보로 상태 업데이트
      setSelectedUser(detailedUser)
      setShowUserModal(true)
    } catch (error) {
      console.error("유저 정보 로딩 실패:", error)
    }
  }

  const handleLikePost = (post: Post) => {
    updatePost({
      ...post,
      reactions: {
        ...post.reactions,
        likes: post.reactions.likes + 1, // 좋아요 +1
      },
    })
  }

  const handleDislikePost = (post: Post) => {
    updatePost({
      ...post,
      reactions: {
        ...post.reactions,
        dislikes: post.reactions.dislikes + 1, // 싫어요 +1
      },
    })
  }

  // --- [6] 렌더링 (Composition) ---
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
          {/* Feature: 필터링 도구 */}
          <PostFilterBar />

          {/* Widget: 게시글 테이블 (데이터와 액션 주입) */}
          {isLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery} // 하이라이팅용
              onEdit={handleEditPost}
              onDelete={deletePost}
              onOpenDetail={handleOpenDetail}
              onOpenUser={handleOpenUser}
              onLike={handleLikePost}
              onDislike={handleDislikePost}
            />
          )}

          {/* Feature: 페이지네이션 */}
          <PostPagination total={total} />
        </div>
      </CardContent>

      {/* --- Dialogs Layer --- */}

      {/* Feature: 게시글 추가 */}
      <PostAddDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSubmit={addPost} />

      {/* Feature: 게시글 수정 */}
      {selectedPost && (
        <PostEditDialog
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          post={selectedPost}
          onSubmit={updatePost}
        />
      )}

      {/* Widget: 게시글 상세 + 댓글 기능 */}
      {selectedPost && (
        <PostDetailDialog
          open={showDetailDialog}
          onOpenChange={setShowDetailDialog}
          post={selectedPost}
          searchQuery={searchQuery}
          comments={comments[selectedPost.id] || []}
          commentActions={{ addComment, updateComment, deleteComment, likeComment }}
        />
      )}

      {/* Entity: 유저 정보 모달 */}
      {selectedUser && <UserProfileModal open={showUserModal} onOpenChange={setShowUserModal} user={selectedUser} />}
    </Card>
  )
}

export default PostsManagerPage
