import { useEffect, useState } from "react"
import { Plus, Search } from "lucide-react"
import { useLocation } from "react-router-dom"
import { Post } from "@/entities/post/model/post"
import { User, UserDetail } from "@/entities/user/model/user"
import { Comment } from "@/entities/comment/model/comment"

import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "../shared"
import { useTags } from "@/entities/tag/model/tag-queries"
import { PostTable } from "@/entities/post/ui"
import { useUpdateURL } from "@/shared/lib/url"
import { SelectBox } from "@/widgets/select-box"
import { usePostMutations } from "@/entities/post/model"
import { usePosts } from "@/features/post/model"
import { PostAddDialog, PostEditDialog, PostDetailDialog } from "@/features/post/ui"
import { CommentAddDialog, CommentEditDialog } from "@/features/comment/ui"
import { useComments } from "@/features/comment/model"
import { useCommentMutations } from "@/entities/comment/model"
import { fetchUserDetail } from "@/entities/user/api/fetch-user-detail"
import { UserModal } from "@/entities/user/ui"

const PostsManager = () => {
  // URL 관리
  const updateURL = useUpdateURL()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 게시물 관련 상태 및 훅
  const { posts, total, loading, refetchPosts, searchPosts, fetchPostsByTag } = usePosts()
  const { createPost, updatePost, deletePost } = usePostMutations({
    onSuccess: () => {
      refetchPosts()
    },
  })

  // 댓글 관련 상태 및 훅
  const { comments, loadComments, removeCommentFromState, likeCommentInState } = useComments()
  const { createComment, modifyComment, removeComment, likeCommentMutation } = useCommentMutations()

  // 페이지 상태
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))
  const [searchQuery, setSearchQuery] = useState(queryParams.get("search") || "")
  const [sortBy, setSortBy] = useState(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState(queryParams.get("sortOrder") || "asc")
  const [selectedTag, setSelectedTag] = useState(queryParams.get("tag") || "")

  // 게시물 Dialog 상태
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  // 댓글 Dialog 상태
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [currentPostId, setCurrentPostId] = useState<number | null>(null)

  // 사용자 Modal 상태
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)

  const tags = useTags()

  // 게시물 추가 핸들러
  const handleAddPost = async (post: { title: string; body: string; userId: number }) => {
    await createPost(post, {
      onSuccess: () => {
        setShowAddDialog(false)
        refetchPosts({ skip, limit })
      },
    })
  }

  // 게시물 업데이트 핸들러
  const handleUpdatePost = async () => {
    if (!selectedPost) return
    await updatePost(selectedPost, {
      onSuccess: () => {
        setShowEditDialog(false)
        refetchPosts({ skip, limit })
      },
    })
  }

  // 게시물 삭제 핸들러
  const handleDeletePost = async (id: number) => {
    await deletePost(id)
    refetchPosts({ skip, limit })
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setCurrentPostId(post.id)
    loadComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 댓글 추가 핸들러
  const handleAddComment = (body: string) => {
    if (!currentPostId) return
    createComment(
      { body, postId: currentPostId, userId: 1 },
      {
        onSuccess: () => {
          setShowAddCommentDialog(false)
          loadComments(currentPostId)
        },
      },
    )
  }

  // 댓글 수정 핸들러
  const handleUpdateComment = (id: number, body: string) => {
    if (!currentPostId) return
    modifyComment(id, body, {
      onSuccess: () => {
        setShowEditCommentDialog(false)
        loadComments(currentPostId)
      },
    })
  }

  // 댓글 삭제 핸들러
  const handleDeleteComment = (commentId: number) => {
    if (!currentPostId) return
    removeComment(commentId, {
      onSuccess: () => {
        removeCommentFromState(currentPostId, commentId)
      },
    })
  }

  // 댓글 좋아요 핸들러
  const handleLikeComment = (commentId: number) => {
    if (!currentPostId) return
    likeCommentMutation(commentId, {
      onSuccess: () => {
        likeCommentInState(currentPostId, commentId)
      },
    })
  }

  // 사용자 모달 열기
  const openUserModal = async (user: User) => {
    try {
      const userData = await fetchUserDetail(user.id)
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      refetchPosts({ skip, limit })
    }
    updateURL({ skip, limit, sortBy, sortOrder, tag: selectedTag })
  }, [skip, limit, sortBy, sortOrder, selectedTag])

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
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="게시물 검색..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && searchPosts(searchQuery)}
                />
              </div>
            </div>
            <SelectBox
              value={selectedTag}
              placeholder="태그 선택"
              options={[
                { value: "all", label: "모든 태그" },
                ...tags.map((tag) => ({ value: tag.slug, label: tag.slug })),
              ]}
              onValueChange={(value) => {
                setSelectedTag(value)
                fetchPostsByTag(value)
                updateURL({ tag: value })
              }}
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
              onValueChange={setSortBy}
            />
            <SelectBox
              value={sortOrder}
              placeholder="정렬 순서"
              options={[
                { value: "asc", label: "오름차순" },
                { value: "desc", label: "내림차순" },
              ]}
              onValueChange={setSortOrder}
            />
          </div>

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable
              posts={posts}
              searchQuery={searchQuery}
              selectedTag={selectedTag}
              onSelectTag={(tag) => {
                setSelectedTag(tag)
                updateURL({ tag })
              }}
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
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>표시</span>
              <SelectBox
                value={limit.toString()}
                placeholder="10"
                options={[
                  { value: "10", label: "10" },
                  { value: "20", label: "20" },
                  { value: "30", label: "30" },
                ]}
                onValueChange={(value) => setLimit(Number(value))}
              />
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
      </CardContent>

      {/* 게시물 추가 Dialog */}
      <PostAddDialog open={showAddDialog} onOpenChange={setShowAddDialog} onSubmit={handleAddPost} />

      {/* 게시물 수정 Dialog */}
      <PostEditDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        post={selectedPost}
        onPostChange={setSelectedPost}
        onSubmit={handleUpdatePost}
      />

      {/* 게시물 상세 보기 Dialog */}
      <PostDetailDialog
        open={showPostDetailDialog}
        onOpenChange={setShowPostDetailDialog}
        post={selectedPost}
        searchQuery={searchQuery}
        comments={currentPostId ? comments[currentPostId] || [] : []}
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

export default PostsManager
