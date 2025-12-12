import { useCommentList } from "@/entities/comments/model/useCommentList"
import { useAddComment } from "@/features/comment/model/useAddComment"
import { useDeleteComment } from "@/features/comment/model/useDeleteComment"
import { useEditComment } from "@/features/comment/model/useEditComment"
import { useLikeComment } from "@/features/comment/model/useLikeComment"
import { useSearchFilter } from "@/features/search/model/useSearchFilter"
import { highlightText } from "@/shared/lib/highlightText"
import { Button } from "@/shared/ui"
import { Textarea } from "@/shared/ui/Card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/Dialog"
import { Edit2, Plus, ThumbsUp, Trash2 } from "lucide-react"
import { type FC } from "react"

interface IProps {
  postId: number
}

const CommentsSection: FC<IProps> = ({ postId }) => {
  // 댓글 목록 조회
  const { comments, loading } = useCommentList(postId)

  // 검색 필터 (하이라이트용)
  const { searchQuery } = useSearchFilter()

  // 댓글 CRUD hooks - postId 전달
  const {
    isOpen,
    setIsOpen,
    newComment,
    setNewComment,
    openAddDialog,
    handleSubmit,
    isLoading: addLoading,
  } = useAddComment()
  const {
    isOpen: editIsOpen,
    setIsOpen: setEditIsOpen,
    selectedComment,
    setSelectedComment,
    openEditDialog,
    handleSubmit: handleEditSubmit,
    isLoading: editLoading,
  } = useEditComment()
  const { handleDelete } = useDeleteComment(postId)
  const { handleLike } = useLikeComment(postId)

  if (loading) {
    return <div className="mt-2 text-sm text-gray-500">댓글 로딩 중...</div>
  }

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={() => openAddDialog(postId)}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments?.map((comment) => (
          <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
            <div className="flex items-center space-x-2 overflow-hidden">
              <span className="font-medium truncate">{comment.user?.username}:</span>
              <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" onClick={() => handleLike(comment.id, comment.likes)}>
                <ThumbsUp className="w-3 h-3" />
                <span className="ml-1 text-xs">{comment.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => openEditDialog(comment)}>
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(comment.id)}>
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* 댓글 추가 다이얼로그 */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
            <Button onClick={handleSubmit} disabled={addLoading}>
              {addLoading ? "추가 중..." : "댓글 추가"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* 댓글 수정 다이얼로그 */}
      <Dialog open={editIsOpen} onOpenChange={setEditIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body ?? ""}
              onChange={(e) =>
                setSelectedComment(selectedComment ? { ...selectedComment, body: e.target.value } : null)
              }
            />
            <Button onClick={handleEditSubmit} disabled={editLoading}>
              {editLoading ? "수정 중..." : "댓글 수정"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CommentsSection
