import { ThumbsDown, ThumbsUp } from "lucide-react"
import DeleteButton from "../../../features/post/ui/DeleteButton"
import { DetailDialogButton } from "../../../features/post/ui/DetailDialogButton"
import EditDialogButton from "../../../features/post/ui/EditDialogButton"
import TagBadge from "../../../features/tag/ui/TagBadge"
import UserInfo from "../../../features/user/ui/UserInfo"
import {
  ErrorDisplay,
  HighlightText,
  Loading,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../shared/ui"
import { usePostTable } from "../lib/usePostTable"
import PaginationControls from "./PaginationControls"

const PostTable = () => {
  const { data, total, isLoading, error, refetch, search } = usePostTable()

  if (isLoading) return <Loading />

  if (error) {
    return <ErrorDisplay error={error} onRetry={() => refetch()} />
  }

  return (
    <>
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
          {data.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div>
                    <HighlightText text={post.title} highlight={search} />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {post.tags.map((tag) => (
                      <TagBadge key={tag} tag={tag} />
                    ))}
                  </div>
                </div>
              </TableCell>
              <TableCell>{post.author && <UserInfo user={post.author} />}</TableCell>
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
                  <DetailDialogButton id={post.id} />
                  <EditDialogButton id={post.id} />
                  <DeleteButton id={post.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationControls total={total} />
    </>
  )
}

export default PostTable
