import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/cards"
import { PostsTable } from "@/widgets/posts-table"
import { AddPostDialog, EditPostDialog, PostDetailDialog } from "@/features/post-crud"
import { AddCommentDialog, EditCommentDialog } from "@/features/comment-crud"
import { UserModal } from "@/features/user-modal"
import { useUiStore } from "@/shared/model"
import { useTagStore } from "@/entities/tag"
import { usePostStore } from "@/entities/post"

const PostsManagerPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { selectedPost } = usePostStore()
  const { selectedTag } = useTagStore()
  const { skip, limit, searchQuery, sortBy, sortOrder, setSkip, setLimit, setSearchQuery, setSortBy, setSortOrder } =
    useUiStore()
  const { setSelectedTag } = useTagStore()

  // URL에서 초기 상태 로드
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  // 상태 변경 시 URL 업데이트
  useEffect(() => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`, { replace: true })
  }, [skip, limit, searchQuery, sortBy, sortOrder, selectedTag])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle>게시물 관리자</CardTitle>
      </CardHeader>
      <CardContent>
        <PostsTable />
      </CardContent>

      {/* Dialogs */}
      <AddPostDialog />
      <EditPostDialog />
      <PostDetailDialog />
      <AddCommentDialog postId={selectedPost?.id ?? null} />
      <EditCommentDialog />
      <UserModal />
    </Card>
  )
}

export default PostsManagerPage
