import { useState } from "react"
import { Plus } from "lucide-react"
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Textarea,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shared/ui"
import { PostTableRow } from "@/entities/post"
import { PostDetailDialog } from "@/entities/post/ui"
import { usePost, PostDetailButton, EditPostButton, DeletePostButton, PostControlBar } from "@/features/post"
import { CommentRow } from "@/entities/comment"
import {
  useComment,
  AddCommentButton,
  EditCommentButton,
  DeleteCommentButton,
  LikeCommentButton,
} from "@/features/comment"
import { UserModal } from "@/entities/user"
import { useUser } from "@/features/user"

const PostsManager = () => {
  const {
    // State
    posts,
    totalPosts,
    selectedPost,
    loading,
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    skip,
    limit,
    tags,
    comments,

    // Setters
    setSelectedPost,
    setSearchQuery,
    setSelectedTag,
    setSortBy,
    setSortOrder,
    setSkip,
    setLimit,

    // Actions
    searchPosts,
    filterPostsByTag,
    addPost,
    editPost,
    deletePost,
    fetchCommentsByPost,
    updateURL,
  } = usePost()

  const {
    // Actions
    addComment: addCommentAction,
    editComment: editCommentAction,
    deleteComment: deleteCommentAction,
    likeComment: likeCommentAction,
  } = useComment()

  const { selectedUser, isOpen: showUserDetailModal, openUserDetailModal, closeUserDetailModal } = useUser()

  // Local state for dialogs
  const [showAddPostDialog, setShowAddPostDialog] = useState(false)
  const [showEditPostDialog, setShowEditPostDialog] = useState(false)
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [newPostForm, setNewPostForm] = useState({ title: "", body: "", userId: 1 })
  const [editPostForm, setEditPostForm] = useState({ title: "", body: "", userId: 1 })
  const [newCommentForm, setNewCommentForm] = useState({ body: "", postId: 0, userId: 1 })
  const [editCommentForm, setEditCommentForm] = useState({ body: "", id: 0, postId: 0 })

  const handleAddPost = async () => {
    if (!newPostForm.title.trim() || !newPostForm.body.trim()) return
    await addPost(newPostForm)
    setNewPostForm({ title: "", body: "", userId: 1 })
    setShowAddPostDialog(false)
  }

  const handleEditPost = async () => {
    if (!selectedPost || !editPostForm.title.trim() || !editPostForm.body.trim()) return
    await editPost(selectedPost.id, editPostForm)
    setShowEditPostDialog(false)
  }

  const handleAddComment = async () => {
    if (!selectedPost || !newCommentForm.body.trim()) return
    await addCommentAction({ ...newCommentForm, postId: selectedPost.id })
    setNewCommentForm({ body: "", postId: 0, userId: 1 })
    setShowAddCommentDialog(false)
  }

  const handleEditComment = async () => {
    if (!editCommentForm.body.trim()) return
    await editCommentAction(editCommentForm.id, editCommentForm.body)
    setShowEditCommentDialog(false)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddPostDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 검색 및 필터 컨트롤 */}
          <PostControlBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSearch={() => searchPosts(searchQuery)}
            selectedTag={selectedTag}
            tags={tags}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onTagChange={(value) => {
              setSelectedTag(value)
              filterPostsByTag(value)
              updateURL()
            }}
            onSortByChange={setSortBy}
            onSortOrderChange={setSortOrder}
          />

          {/* 게시물 테이블 */}
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : !posts || posts.length === 0 ? (
            <div className="flex justify-center p-4 text-gray-500">게시물이 없습니다</div>
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
                  <PostTableRow
                    key={post.id}
                    post={post}
                    searchQuery={searchQuery}
                    selectedTag={selectedTag}
                    onTagClick={(tag) => {
                      setSelectedTag(tag)
                      filterPostsByTag(tag)
                      updateURL()
                    }}
                    onUserClick={() => {
                      if (post.author) {
                        openUserDetailModal(post.author.id)
                      }
                    }}
                    actions={
                      <>
                        <PostDetailButton
                          post={post}
                          onClick={() => {
                            setSelectedPost(post)
                            fetchCommentsByPost(post.id)
                          }}
                        />
                        <EditPostButton
                          post={post}
                          onClick={(p) => {
                            setSelectedPost(p)
                            setEditPostForm({ title: p.title, body: p.body, userId: p.userId })
                            setShowEditPostDialog(true)
                          }}
                        />
                        <DeletePostButton
                          post={post}
                          onClick={async (id) => {
                            await deletePost(id)
                          }}
                        />
                      </>
                    }
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
              <Button disabled={skip + limit >= totalPosts} onClick={() => setSkip(skip + limit)}>
                다음
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <Dialog open={showAddPostDialog} onOpenChange={setShowAddPostDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newPostForm.title}
              onChange={(e) => setNewPostForm({ ...newPostForm, title: e.target.value })}
            />
            <Textarea
              rows={30}
              placeholder="내용"
              value={newPostForm.body}
              onChange={(e) => setNewPostForm({ ...newPostForm, body: e.target.value })}
            />
            <Input
              type="number"
              placeholder="사용자 ID"
              value={newPostForm.userId}
              onChange={(e) => setNewPostForm({ ...newPostForm, userId: Number(e.target.value) })}
            />
            <Button onClick={handleAddPost}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditPostDialog} onOpenChange={setShowEditPostDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={editPostForm.title}
              onChange={(e) => setEditPostForm({ ...editPostForm, title: e.target.value })}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={editPostForm.body}
              onChange={(e) => setEditPostForm({ ...editPostForm, body: e.target.value })}
            />
            <Button onClick={handleEditPost}>게시물 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 추가 대화상자 */}
      <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 댓글 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={newCommentForm.body}
              onChange={(e) => setNewCommentForm({ ...newCommentForm, body: e.target.value })}
            />
            <Button onClick={handleAddComment}>댓글 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 대화상자 */}
      <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={editCommentForm.body}
              onChange={(e) => setEditCommentForm({ ...editCommentForm, body: e.target.value })}
            />
            <Button onClick={handleEditComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <PostDetailDialog
        open={selectedPost !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedPost(null)
        }}
        post={selectedPost}
        searchQuery={searchQuery}
      >
        {selectedPost?.id && (
          <div className="mt-2">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">댓글</h3>
              <AddCommentButton
                onClick={() => {
                  setNewCommentForm({ body: "", postId: selectedPost.id, userId: 1 })
                  setShowAddCommentDialog(true)
                }}
              />
            </div>
            <div className="space-y-1">
              {comments[selectedPost.id]?.map((comment) => (
                <CommentRow
                  key={comment.id}
                  comment={comment}
                  searchQuery={searchQuery}
                  actions={
                    <>
                      <LikeCommentButton
                        comment={comment}
                        onClick={(id) => {
                          likeCommentAction(id, comment.likes)
                        }}
                      />
                      <EditCommentButton
                        comment={comment}
                        onClick={(c) => {
                          setEditCommentForm({ id: c.id, body: c.body, postId: c.postId })
                          setShowEditCommentDialog(true)
                        }}
                      />
                      <DeleteCommentButton
                        comment={comment}
                        onClick={(id, pid) => {
                          deleteCommentAction(id, pid)
                        }}
                      />
                    </>
                  }
                />
              ))}
            </div>
          </div>
        )}
      </PostDetailDialog>

      {/* 사용자 모달 */}
      <UserModal open={showUserDetailModal} onOpenChange={closeUserDetailModal} user={selectedUser} />
    </Card>
  )
}

export default PostsManager
