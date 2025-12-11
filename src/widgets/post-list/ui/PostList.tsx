import { useMemo } from 'react'
import type { Post } from '../../../entities/post'
import { usePostFilters } from '../../../features/post'
import { PostRow } from '../../../entities/post/ui'
import { PostSearchInput, PostTagFilter, PostSortControls, PostPagination } from '../../../features/post/ui'
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../shared/ui"

interface PostListProps {
  tags: Array<{ url: string; slug: string }>
  posts: Post[]
  isLoading?: boolean
  onPostDetail: (post: Post) => void
  onPostEdit: (post: Post) => void
  onPostDelete: (postId: number) => void
  onUserClick: (author: Post['author']) => void
  onTagChange: (tag: string) => void
}

/**
 * 게시물 목록 위젯
 * 검색/필터 컨트롤과 게시물 테이블을 포함합니다.
 * Features UI 컴포넌트와 Entities UI 컴포넌트를 사용하여 Props Drilling을 최소화했습니다.
 */
export const PostList = ({
  tags,
  posts,
  isLoading = false,
  onPostDetail,
  onPostEdit,
  onPostDelete,
  onUserClick,
  onTagChange,
}: PostListProps) => {
  const { sortPosts, searchQuery, selectedTag, sortBy, sortOrder } = usePostFilters()
  // sortBy나 sortOrder가 변경되면 정렬이 다시 실행되도록 useMemo 사용
  const sortedPosts = useMemo(() => sortPosts(posts), [posts, sortPosts, sortBy, sortOrder])

  return (
    <div className="flex flex-col gap-4">
      {/* 검색 및 필터 컨트롤 */}
      <div className="flex gap-4">
        <PostSearchInput />
        <PostTagFilter tags={tags} />
        <PostSortControls />
      </div>

      {/* 게시물 테이블 */}
      {isLoading ? (
        <div className="flex justify-center p-4">로딩 중...</div>
      ) : (
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
            {sortedPosts.map((post) => (
              <PostRow
                key={post.id}
                post={post}
                searchQuery={searchQuery}
                selectedTag={selectedTag}
                onPostDetail={onPostDetail}
                onPostEdit={onPostEdit}
                onPostDelete={onPostDelete}
                onUserClick={onUserClick}
                onTagClick={onTagChange}
              />
            ))}
          </TableBody>
        </Table>
      )}

      {/* 페이지네이션 */}
      <PostPagination />
    </div>
  )
}
