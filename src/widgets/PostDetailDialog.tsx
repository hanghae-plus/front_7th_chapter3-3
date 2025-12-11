import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "react-router-dom"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"
import { Post } from "@/entities/post"
import { commentQueries } from "@/entities/comment"
import { CommentList } from "./CommentList"
import { highlightText } from "@/shared/lib"
import { OverlayController } from "@/shared/lib/overlay"

interface PostDetailDialogProps {
  post: Post
  controller: OverlayController
}

export const PostDetailDialog = ({ post, controller }: PostDetailDialogProps) => {
  const [searchParams] = useSearchParams()

  // URL에서 직접 searchQuery 읽기
  const searchQuery = searchParams.get("search") || ""

  // TanStack Query로 댓글 조회 (post와 open 상태에 따라 조건부 실행)
  const { data: commentsData } = useQuery({
    ...commentQueries.listByPost(post.id),
    enabled: controller.isOpen, // 다이얼로그가 열렸을 때만 실행
  })

  const comments = commentsData?.comments || []

  return (
    <Dialog open={controller.isOpen} onOpenChange={(open) => !open && controller.close()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post.body, searchQuery)}</p>
          <CommentList postId={post.id} comments={comments} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
