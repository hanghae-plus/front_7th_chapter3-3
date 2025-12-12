import AddCommentDialog from "../../features/comment/ui/AddCommentDialog"
import EditCommentDialog from "../../features/comment/ui/EditCommentDialog"
import AddDialog from "../../features/post/ui/AddDialog"
import AddDialogButton from "../../features/post/ui/AddDialogButton"
import DetailDialog from "../../features/post/ui/DetailDialog"
import EditDialog from "../../features/post/ui/EditDialog"
import UserDialog from "../../features/user/ui/UserDialog"
import { Card, CardContent, CardHeader, CardTitle } from "../../shared/ui"
import FilterControls from "../../widgets/post/ui/FilterControls"
import PostTable from "../../widgets/post/ui/PostTable"

const PostsManager = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <AddDialogButton />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <FilterControls />
          <PostTable />
        </div>
      </CardContent>

      <AddDialog />
      <EditDialog />
      <AddCommentDialog />
      <EditCommentDialog />
      <DetailDialog />
      <UserDialog />
    </Card>
  )
}

export default PostsManager
