import { Plus } from "lucide-react"
import { Button, Card } from "../../shared/ui"

import AddPostDialog from "../../features/post/ui/AddPostDialog"
import EditPostDialog from "../../features/post/ui/EditPostDialog"
import AddCommentDialog from "../../features/comment/ui/AddCommentDialog"
import EditCommentDialog from "../../features/comment/ui/EditCommentDialog"
import DetailPostDialog from "../../widgets/post/ui/DetailPostDialog"
import UserDialog from "../../features/user/ui/UserDialog"
import PostContent from "../../widgets/post/ui/PostContent"
import { useAddPostDialogStore } from "../../features/post/model/useAddPostDialogStore"

const PostsManager = () => {
  const setShowAddDialog = useAddPostDialogStore((state) => state.setShowDialog)

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <Card.Header>
        <Card.Title className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </Card.Title>
      </Card.Header>

      <Card.Content>
        <PostContent />
      </Card.Content>

      {/* 게시물 상세 보기  */}
      <DetailPostDialog />

      {/* 댓글 추가 */}
      <AddCommentDialog />

      {/* 댓글 수정 */}
      <EditCommentDialog />

      {/* 게시물 추가 */}
      <AddPostDialog />

      {/* 게시물 수정 */}
      <EditPostDialog />

      {/* 사용자 모달 */}
      <UserDialog />
    </Card>
  )
}

export default PostsManager
