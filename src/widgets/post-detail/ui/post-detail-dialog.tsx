/**
 * Post Detail Widget UI
 * 
 * 게시물 상세 위젯 컴포넌트
 * 게시물 상세 정보와 댓글 목록을 표시
 */

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { usePostStore } from "../../../entities/post/model"
import { useUIStore } from "../../../shared/lib/stores"
import { highlightText } from "../../../shared/lib/text-utils"
import { CommentList } from "../../comment-list/ui"

/**
 * 게시물 상세 다이얼로그 위젯
 */
export function PostDetailDialog() {
  const { selectedPost, searchQuery, setSelectedPost } = usePostStore()
  const { showPostDetailDialog, setShowPostDetailDialog } = useUIStore()

  if (!selectedPost) return null

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setShowPostDetailDialog(false)
      setSelectedPost(null)
    }
  }

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost.body, searchQuery)}</p>
          <CommentList postId={selectedPost.id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

