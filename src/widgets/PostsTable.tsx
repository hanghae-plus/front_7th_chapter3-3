import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui"
import { Post } from "@/entities/post"
import { PostReactions, PostTags } from "@/entities/post"
import { UserAvatar, userQueries } from "@/entities/user"
import { EditPostButton } from "@/features/edit-post"
import { DeletePostButton } from "@/features/delete-post"
import { ViewPostDetailButton } from "@/features/view-post-detail"
import { highlightText } from "@/shared/lib"

interface PostsTableProps {
  posts: Post[]
  searchQuery: string
  selectedTag: string
  onTagClick: (tag: string) => void
  onUserClick: (userId: number) => void
  onPostDetailClick: (post: Post) => void
  onPostsUpdate: () => void
}

export const PostsTable = ({
  posts,
  searchQuery,
  selectedTag,
  onTagClick,
  onUserClick,
  onPostDetailClick,
  onPostsUpdate,
}: PostsTableProps) => {
  // 위젯 자체적으로 users 데이터 조회하여 posts와 조합
  const { data: usersData } = useQuery(userQueries.list({ limit: 0, select: "username,image" }))

  const postsWithAuthors = useMemo(() => {
    if (!usersData) return posts

    return posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId),
    }))
  }, [posts, usersData])

  return (
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
        {postsWithAuthors.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>
                {post.tags && (
                  <PostTags tags={post.tags} selectedTag={selectedTag} onTagClick={onTagClick} />
                )}
              </div>
            </TableCell>
            <TableCell>
              {post.author && <UserAvatar user={post.author} onClick={() => onUserClick(post.author!.id)} />}
            </TableCell>
            <TableCell>
              <PostReactions likes={post.reactions?.likes} dislikes={post.reactions?.dislikes} />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ViewPostDetailButton post={post} onClick={onPostDetailClick} />
                <EditPostButton post={post} onSuccess={onPostsUpdate} />
                <DeletePostButton postId={post.id} onSuccess={onPostsUpdate} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
