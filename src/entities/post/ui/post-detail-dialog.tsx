import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"
import { highlightText } from "@/shared/lib/text"
import type { Post } from "../model/types"
import type { ReactNode } from "react"

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: Post | null
  searchQuery: string
  children?: ReactNode
}

/**
 * 게시물 상세 정보를 보여주는 Dialog
 * 제목, 내용, 그리고 댓글을 표시합니다.
 */
export const PostDetailDialog = ({
  open,
  onOpenChange,
  post,
  searchQuery,
  children,
}: PostDetailDialogProps) => {
  if (!post) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{post.title && highlightText(post.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{post.body && highlightText(post.body, searchQuery)}</p>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

