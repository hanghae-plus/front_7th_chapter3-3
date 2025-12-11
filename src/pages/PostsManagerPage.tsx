import { useState } from "react"
import { Plus } from "lucide-react"
import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"

// Features
import {
  usePostList,
  useTags,
  usePostsByTag,
  usePostSearch,
  usePostCreate,
  usePostUpdate,
  usePostDelete,
  usePostFilters,
  usePostCreateModal,
  usePostEditModal,
  usePostDetailModal,
} from "../features/post"
import {
  useCommentList,
  useCommentCreate,
  useCommentUpdate,
  useCommentDelete,
  useCommentLike,
} from "../features/comment"
import { useUserDetail, useUserModal } from "../features/user"

// Widgets
import { PostList } from "../widgets/post-list"
import { PostDetail } from "../widgets/post-detail"
import { PostCreateModal } from "../widgets/post-create-modal"
import { PostEditModal } from "../widgets/post-edit-modal"
import { UserModal } from "../widgets/user-modal"

// Types
import type { Comment } from "../entities/comment"
import type { Post } from "../entities/post"

const PostsManagerPage = () => {
  // 필터
  const filters = usePostFilters()

  // 모달 관리
  const postCreateModal = usePostCreateModal()
  const postEditModal = usePostEditModal()
  const postDetailModal = usePostDetailModal()
  const userModal = useUserModal()

  // 선택된 사용자 ID (모달이 열릴 때 설정)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  // Query hooks - 선언적 방식
  // 검색 쿼리 (검색어가 있을 때)
  const searchQuery = usePostSearch(filters.searchQuery)

  // 게시물 목록 (태그가 'all'이거나 없을 때, 검색어도 없을 때)
  const postListQuery = usePostList(
    filters.limit,
    filters.skip
  )

  // 태그별 게시물 (태그가 선택되었을 때)
  const postsByTagQuery = usePostsByTag(filters.selectedTag || '')

  // 태그 목록
  const tagsQuery = useTags()

  // 댓글 목록 (게시물 상세 모달이 열렸을 때)
  const commentListQuery = useCommentList(
    postDetailModal.selectedPost?.id || 0
  )

  // 사용자 상세 (사용자 모달이 열렸을 때)
  const userDetailQuery = useUserDetail(selectedUserId || 0)

  // 현재 표시할 게시물 데이터 결정
  // 우선순위: 검색어 > 태그 필터 > 일반 목록
  const currentPosts = filters.searchQuery?.trim()
    ? searchQuery.data?.posts ?? []
    : filters.selectedTag && filters.selectedTag !== 'all'
    ? postsByTagQuery.data?.posts ?? []
    : postListQuery.posts

  const isLoadingPosts = filters.searchQuery?.trim()
    ? searchQuery.isLoading
    : filters.selectedTag && filters.selectedTag !== 'all'
    ? postsByTagQuery.isLoading
    : postListQuery.isLoading

  // Mutation hooks
  const createPostMutation = usePostCreate()
  const updatePostMutation = usePostUpdate()
  const deletePostMutation = usePostDelete()
  const createCommentMutation = useCommentCreate()
  const updateCommentMutation = useCommentUpdate()
  const deleteCommentMutation = useCommentDelete()
  const likeCommentMutation = useCommentLike()

  // 태그 변경
  const handleTagChange = (tag: string) => {
    filters.setSelectedTag(tag)
    filters.syncURL()
  }

  // 게시물 생성
  const handleCreatePost = () => {
    createPostMutation.mutate(postCreateModal.formData, {
      onSuccess: () => {
        postCreateModal.closeModal()
      },
      onError: (error) => {
        console.error("게시물 생성 오류:", error)
      },
    })
  }

  // 게시물 수정
  const handleUpdatePost = () => {
    if (!postEditModal.editingPost) return

    updatePostMutation.mutate(
      {
        id: postEditModal.editingPost.id,
        post: postEditModal.formData,
      },
      {
        onSuccess: () => {
          postEditModal.closeModal()
        },
        onError: (error) => {
          console.error("게시물 수정 오류:", error)
        },
      }
    )
  }

  // 게시물 삭제
  const handleDeletePost = (postId: number) => {
    deletePostMutation.mutate(postId, {
      onError: (error) => {
        console.error("게시물 삭제 오류:", error)
      },
    })
  }

  // 게시물 상세 보기
  const handlePostDetail = (post: Post) => {
    postDetailModal.openModal(post)
  }

  // 게시물 수정 모달 열기
  const handleEditPost = (post: Post) => {
    postEditModal.openModal(post)
  }

  // 댓글 추가
  const handleAddComment = () => {
    if (!postDetailModal.selectedPost) return

    createCommentMutation.mutate(
      {
        body: "",
        postId: postDetailModal.selectedPost.id,
        userId: 1,
      },
      {
        onError: (error) => {
          console.error("댓글 추가 오류:", error)
        },
      }
    )
  }

  // 댓글 수정
  const handleEditComment = (comment: Comment) => {
    updateCommentMutation.mutate(
      {
        id: comment.id,
        comment: { body: comment.body },
      },
      {
        onError: (error) => {
          console.error("댓글 수정 오류:", error)
        },
      }
    )
  }

  // 댓글 삭제
  const handleDeleteComment = (commentId: number, postId: number) => {
    deleteCommentMutation.mutate(
      { id: commentId, postId },
      {
        onError: (error) => {
          console.error("댓글 삭제 오류:", error)
        },
      }
    )
  }

  // 댓글 좋아요
  const handleLikeComment = (commentId: number, postId: number) => {
    // 현재 댓글 찾기
    const comment = commentListQuery.data?.comments.find((c) => c.id === commentId)
    if (!comment) return

    likeCommentMutation.mutate(
      {
        id: commentId,
        likes: comment.likes,
        postId,
      },
      {
        onError: (error) => {
          console.error("댓글 좋아요 오류:", error)
        },
      }
    )
  }

  // 사용자 모달 열기
  const handleUserClick = (author: Post["author"]) => {
    if (!author) return
    setSelectedUserId(author.id)
    userModal.openModal()
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={postCreateModal.openModal}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {/* 게시물 목록 위젯 */}
          <PostList
            tags={tagsQuery.data ?? []}
            posts={currentPosts}
            isLoading={isLoadingPosts}
            onPostDetail={handlePostDetail}
            onPostEdit={handleEditPost}
            onPostDelete={handleDeletePost}
            onUserClick={handleUserClick}
            onTagChange={handleTagChange}
          />

          {/* 에러 표시 */}
          {(postListQuery.isError || postsByTagQuery.isError || searchQuery.isError) && (
            <div className="p-4 bg-red-50 text-red-800 rounded-md">
              {searchQuery.error?.message || postListQuery.error?.message || postsByTagQuery.error?.message || '게시물을 불러오는데 실패했습니다'}
            </div>
          )}
        </div>
      </CardContent>

      {/* 게시물 생성 모달 */}
      <PostCreateModal
        isOpen={postCreateModal.isOpen}
        onClose={postCreateModal.closeModal}
        title={postCreateModal.formData.title}
        body={postCreateModal.formData.body}
        userId={postCreateModal.formData.userId}
        onTitleChange={postCreateModal.updateTitle}
        onBodyChange={postCreateModal.updateBody}
        onUserIdChange={postCreateModal.updateUserId}
        onSubmit={handleCreatePost}
      />

      {/* 게시물 수정 모달 */}
      <PostEditModal
        isOpen={postEditModal.isOpen}
        onClose={postEditModal.closeModal}
        post={postEditModal.editingPost}
        onTitleChange={postEditModal.updateTitle}
        onBodyChange={postEditModal.updateBody}
        onSubmit={handleUpdatePost}
      />

      {/* 게시물 상세 모달 */}
      <PostDetail
        post={postDetailModal.selectedPost}
        comments={commentListQuery.data?.comments ?? []}
        searchQuery={filters.searchQuery}
        isOpen={postDetailModal.isOpen}
        onClose={postDetailModal.closeModal}
        onAddComment={handleAddComment}
        onLikeComment={handleLikeComment}
        onEditComment={handleEditComment}
        onDeleteComment={handleDeleteComment}
      />

      {/* 사용자 모달 */}
      <UserModal
        isOpen={userModal.isOpen}
        onClose={userModal.closeModal}
        user={userDetailQuery.data || null}
      />
    </Card>
  )
}

export default PostsManagerPage
