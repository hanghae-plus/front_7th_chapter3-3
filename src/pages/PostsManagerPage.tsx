import { useEffect, useState, useMemo } from "react"
import { Edit2, MessageSquare, Plus, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { useLocation } from "react-router-dom"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea,
} from "../shared/components/ui"
import { usePostList, usePostTags, usePostSearch, usePostByTag } from "../entities/posts/model"
import { useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } from "../entities/posts/model/mutations"
import {
  useCommentList,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
} from "../entities/comments/model"
import { useUserList } from "../entities/users/model"
import { UserDetailModal } from "../widgets/user-detail/ui/UserDetailModal"
import { PostSearchFilterBar } from "../features/search-filter-post/ui/PostSearchFilterBar"
import { usePostSearchFilter } from "../features/search-filter-post/model"

const PostsManager = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 페이지네이션 상태
  const [skip, setSkip] = useState(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState(parseInt(queryParams.get("limit") || "10"))

  // 검색/필터 상태 (usePostSearchFilter 훅 사용)
  const {
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    setSearchQuery,
    setSelectedTag,
    setSortBy,
    setSortOrder,
    handleSearch,
    updateURL: updateFilterURL,
  } = usePostSearchFilter()

  // UI 상태
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const [selectedComment, setSelectedComment] = useState<any>(null)
  const [newComment, setNewComment] = useState<{ body: string; postId: number | null; userId: number }>({
    body: "",
    postId: null,
    userId: 1,
  })
  const [showAddCommentDialog, setShowAddCommentDialog] = useState(false)
  const [showEditCommentDialog, setShowEditCommentDialog] = useState(false)
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [selectedPostIdForComments, setSelectedPostIdForComments] = useState<number | null>(null)

  // Queries
  const { data: tagsData } = usePostTags()
  const tags = tagsData || []

  const { data: usersData } = useUserList(0, "username,image")
  const users = usersData?.users || []

  // 조건부 쿼리: 검색, 태그, 일반 리스트
  const shouldSearch = !!searchQuery.trim()
  const shouldFilterByTag = !!selectedTag && selectedTag !== "all"

  const { data: postsListData, isLoading: isLoadingPosts } = usePostList(limit, skip)
  const { data: searchData, isLoading: isLoadingSearch } = usePostSearch(searchQuery)
  const { data: tagData, isLoading: isLoadingTag } = usePostByTag(selectedTag)

  // 현재 posts 데이터 결정
  const currentPostsData = shouldSearch ? searchData : shouldFilterByTag ? tagData : postsListData
  const isLoading =
    (shouldSearch && isLoadingSearch) ||
    (shouldFilterByTag && isLoadingTag) ||
    (!shouldSearch && !shouldFilterByTag && isLoadingPosts)

  // posts와 users 결합
  const posts = useMemo(() => {
    if (!currentPostsData?.posts) return []
    return currentPostsData.posts.map((post: any) => ({
      ...post,
      author: users.find((user: any) => user.id === post.userId),
    }))
  }, [currentPostsData, users])

  const total = currentPostsData?.total || 0

  // 댓글 쿼리
  const { data: commentsData } = useCommentList(selectedPostIdForComments || 0)
  const comments = commentsData?.comments || []

  // Mutations
  const createPostMutationHook = useCreatePostMutation({
    onSuccess: () => {
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    },
  })

  const updatePostMutationHook = useUpdatePostMutation({
    onSuccess: () => {
      setShowEditDialog(false)
      setSelectedPost(null)
    },
  })

  const deletePostMutationHook = useDeletePostMutation()

  const createCommentMutation = useCreateCommentMutation(selectedPostIdForComments || 0, {
    onSuccess: () => {
      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    },
  })

  const updateCommentMutation = useUpdateCommentMutation(selectedPostIdForComments || 0, {
    onSuccess: () => {
      setShowEditCommentDialog(false)
      setSelectedComment(null)
    },
  })

  const deleteCommentMutation = useDeleteCommentMutation(selectedPostIdForComments || 0)

  const likeCommentMutation = useLikeCommentMutation(selectedPostIdForComments || 0)

  // URL 업데이트 함수 (skip, limit 포함)
  const updateURL = () => {
    updateFilterURL(undefined, {
      skip: skip.toString(),
      limit: limit.toString(),
    })
  }

  // 게시물 추가
  const addPost = () => {
    createPostMutationHook.mutate(newPost)
  }

  // 게시물 업데이트
  const updatePost = () => {
    if (!selectedPost) return
    updatePostMutationHook.mutate({ id: selectedPost.id, post: selectedPost })
  }

  // 게시물 삭제
  const deletePost = (id: number) => {
    deletePostMutationHook.mutate(id)
  }

  // 댓글 추가
  const addComment = () => {
    if (!newComment.postId) return
    createCommentMutation.mutate({
      body: newComment.body,
      postId: newComment.postId,
      userId: newComment.userId,
    })
  }

  // 댓글 업데이트
  const updateComment = () => {
    if (!selectedComment || !selectedComment.id) return
    updateCommentMutation.mutate({ id: selectedComment.id, body: selectedComment.body })
  }

  // 댓글 삭제
  const deleteComment = (id: number) => {
    deleteCommentMutation.mutate(id)
  }

  // 댓글 좋아요
  const likeComment = (id: number) => {
    const comment = comments.find((c: any) => c.id === id)
    if (!comment) return
    const newLikes = comment.likes + 1
    likeCommentMutation.mutate({ id, likes: newLikes })
  }

  // 게시물 상세 보기
  const openPostDetail = (post: any) => {
    setSelectedPost(post)
    setSelectedPostIdForComments(post.id)
    setShowPostDetailDialog(true)
  }

  // 사용자 모달 열기
  const openUserModal = (user: any) => {
    setSelectedUserId(user?.id || null)
    setShowUserModal(true)
  }

  // skip, limit 변경 시 URL 업데이트
  useEffect(() => {
    updateURL()
  }, [skip, limit])

  // URL 파라미터에서 skip, limit 읽기
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
  }, [location.search])

  // 하이라이트 함수 추가
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    )
  }

  // 게시물 테이블 렌더링
  const renderPostTable = () => (
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
        {posts.map((post: any) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>

                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag)
                        updateURL()
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post)
                    setShowEditDialog(true)
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  // 댓글 렌더링
  const renderComments = (postId: number) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments.map((comment: any) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedComment(comment)
                  setShowEditCommentDialog(true)
                }}
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

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
          <PostSearchFilterBar
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            onSearch={handleSearch}
            selectedTag={selectedTag}
            onTagChange={(value) => {
              setSelectedTag(value)
              updateURL()
            }}
            tags={tags}
            sortBy={sortBy}
            onSortByChange={(value) => {
              setSortBy(value)
              updateURL()
            }}
            sortOrder={sortOrder}
            onSortOrderChange={(value) => {
              setSortOrder(value)
              updateURL()
            }}
          />

          {/* 게시물 테이블 */}
          {isLoading ? <div className="flex justify-center p-4">로딩 중...</div> : renderPostTable()}

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
      </CardContent>

      {/* 게시물 추가 대화상자 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              rows={30}
              placeholder="내용"
              value={newPost.body}
              onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            />
            <Input
              type="number"
              placeholder="사용자 ID"
              value={newPost.userId}
              onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
            />
            <Button onClick={addPost}>게시물 추가</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 수정 대화상자 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
            />
            <Button onClick={updatePost}>게시물 업데이트</Button>
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
              value={newComment.body}
              onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            <Button onClick={addComment}>댓글 추가</Button>
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
              value={selectedComment?.body || ""}
              onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
            />
            <Button onClick={updateComment}>댓글 업데이트</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 게시물 상세 보기 대화상자 */}
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body, searchQuery)}</p>
            {renderComments(selectedPost?.id)}
          </div>
        </DialogContent>
      </Dialog>

      {/* 사용자 모달 */}
      {selectedUserId && (
        <UserDetailModal open={showUserModal} onOpenChange={setShowUserModal} userId={selectedUserId} />
      )}
    </Card>
  )
}

export default PostsManager
