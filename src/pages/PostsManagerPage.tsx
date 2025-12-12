import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/Card"
import PostsTable from "@/widgets/PostsTable"
import SearchFilter from "@/widgets/SearchFilter"
import Pagination from "@/widgets/Pagination"
import PostDetailDialog from "@/widgets/PostDetailDialog"
import EditPostDialog from "@/widgets/EditPostDialog"
import AddPostDialog from "@/widgets/AddPostDialog"
import { usePostList } from "@/entities/posts/model/usePostList"
import { useSearchFilter } from "@/features/search/model/useSearchFilter"

const PostsManager = () => {
  const { selectedTag, limit, skip, searchQuery } = useSearchFilter()
  const { posts, total, loading, removePost } = usePostList(limit, skip, selectedTag, searchQuery)

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <AddPostDialog />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <SearchFilter />
          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostsTable posts={posts} onRemovePost={removePost} />
          )}
          <Pagination total={total} />
        </div>
      </CardContent>

      <PostDetailDialog />
      <EditPostDialog />
    </Card>
  )
}

export default PostsManager
