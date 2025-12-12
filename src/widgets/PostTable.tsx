import { useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui"
import { Post, postQueries, PostReactions, PostTags } from "@/entities/post"
import { UserAvatar, userQueries } from "@/entities/user"
import { EditPostButton } from "@/features/post/edit-post"
import { DeletePostButton } from "@/features/post/delete-post"
import { ViewPostDetailButton } from "@/features/post/view-post-detail"
import { highlightText } from "@/shared/lib"
import { usePostsParams } from "@/shared/lib/posts-params"
import { Pagination } from "@/widgets/Pagination"

interface PostTableProps {
  onUserClick: (userId: number) => void
  onPostDetailClick: (post: Post) => void
}

export const PostTable = ({ onUserClick, onPostDetailClick }: PostTableProps) => {
  const { params, updateParams } = usePostsParams()
  const { skip, limit, search: searchQuery, tag: selectedTag, sortBy, sortOrder } = params

  // sortOrder가 있는데 sortBy가 없으면 기본값으로 'id' 사용
  const effectiveSortBy = sortOrder && !sortBy ? "id" : sortBy
  const effectiveSortOrder = sortOrder || "asc"

  // 게시물 조회 (검색어, 태그, 페이지네이션 고려)
  const searchResult = useQuery({
    ...postQueries.search(searchQuery),
    enabled: !!searchQuery,
  })

  const tagResult = useQuery({
    ...postQueries.listByTag(selectedTag),
    enabled: !!selectedTag && !searchQuery,
  })

  const listResult = useQuery({
    ...postQueries.list({ limit, skip, sortBy: effectiveSortBy, order: effectiveSortOrder }),
    enabled: !searchQuery && !selectedTag,
  })

  // 활성화된 쿼리 결과 선택
  const postsData = searchQuery ? searchResult.data : selectedTag ? tagResult.data : listResult.data
  const posts = postsData?.posts || []
  const total = postsData?.total || 0

  // 위젯 자체적으로 users 데이터 조회하여 posts와 조합
  const { data: usersData } = useQuery(userQueries.list({ limit: 0, select: "username,image" }))

  const postsWithAuthors = useMemo(() => {
    if (!usersData) return posts

    return posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId),
    }))
  }, [posts, usersData])

  // 태그 클릭 핸들러
  const handleTagClick = (tag: string) => {
    updateParams({
      tag,
      skip: 0,
      search: "",
    })
  }

  // 페이지네이션 핸들러
  const handleSkipChange = (newSkip: number) => {
    updateParams({ skip: newSkip })
  }

  const handleLimitChange = (newLimit: number) => {
    updateParams({ limit: newLimit, skip: 0 })
  }

  return (
    <div className="flex flex-col gap-4">
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
                    <PostTags tags={post.tags} selectedTag={selectedTag} onTagClick={handleTagClick} />
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
                  <EditPostButton post={post} />
                  <DeletePostButton postId={post.id} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        skip={skip}
        limit={limit}
        total={total}
        onSkipChange={handleSkipChange}
        onLimitChange={handleLimitChange}
      />
    </div>
  )
}
