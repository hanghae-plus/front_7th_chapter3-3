import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent, Button } from '@/shared/ui'
import { Plus } from 'lucide-react'
import { usePostsStore } from '@/shared/model/store'
import { usePosts, useSearchPosts, usePostsByTag } from '@/entities/post/api/queries'
import { useUser } from '@/entities/user/api/queries'
import { Post } from '@/entities/post/model/types'
import { PostsTable } from '@/widgets/posts-table/ui/PostsTable'
import { PostDetailDialog } from '@/widgets/post-detail/ui/PostDetailDialog'
import { PostsFilters } from '@/widgets/posts-filters/ui/PostsFilters'
import { PostsPagination } from '@/widgets/posts-pagination/ui/PostsPagination'
import { PostSearchBar } from '@/features/post-search/ui/PostSearchBar'
import { PostCreateDialog } from '@/features/post-create/ui/PostCreateDialog'
import { PostUpdateDialog } from '@/features/post-update/ui/PostUpdateDialog'
import { usePostDelete } from '@/features/post-delete'
import { UserModal } from '@/entities/user/ui/UserModal'

export const PostsManagerPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { searchQuery, selectedTag, skip, limit, setSearchQuery, setSelectedTag, setSkip, setLimit } = usePostsStore()

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPostDetail, setShowPostDetail] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>()

  const { data: postsData, isLoading } = usePosts({ limit, skip })
  const { data: searchData } = useSearchPosts(searchQuery, { limit, skip })
  const { data: tagData } = usePostsByTag(selectedTag, { limit, skip })
  const { data: userData } = useUser(selectedUserId, showUserModal)
  const { handleDelete } = usePostDelete()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get('skip') || '0'))
    setLimit(parseInt(params.get('limit') || '10'))
    setSearchQuery(params.get('search') || '')
    setSelectedTag(params.get('tag') || '')
  }, [location.search])

  const updateURL = (updates?: { skip?: number; limit?: number; search?: string; tag?: string }) => {
    const params = new URLSearchParams()
    const newSkip = updates?.skip !== undefined ? updates.skip : skip
    const newLimit = updates?.limit !== undefined ? updates.limit : limit
    const newSearch = updates?.search !== undefined ? updates.search : searchQuery
    const newTag = updates?.tag !== undefined ? updates.tag : selectedTag

    if (newSkip) params.set('skip', newSkip.toString())
    if (newLimit !== 10) params.set('limit', newLimit.toString())
    if (newSearch) params.set('search', newSearch)
    if (newTag && newTag !== 'all') params.set('tag', newTag)
    navigate(`?${params.toString()}`, { replace: true })
  }

  const handleSearch = () => {
    setSkip(0)
    updateURL({ skip: 0 })
  }

  const handleTagChange = () => {
    setSkip(0)
    updateURL({ skip: 0 })
  }

  const handleSkipChange = (newSkip: number) => {
    setSkip(newSkip)
    updateURL({ skip: newSkip })
  }

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
    setSkip(0)
    updateURL({ limit: newLimit, skip: 0 })
  }

  const handlePostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetail(true)
  }

  const handlePostEdit = (post: Post) => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  const handlePostDelete = (post: Post) => {
    handleDelete(post.id, post.title)
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
    setSkip(0)
    updateURL({ tag, skip: 0 })
  }

  const handleAuthorClick = (author: any) => {
    setSelectedUserId(author.id)
    setShowUserModal(true)
  }

  const displayData = searchQuery ? searchData : selectedTag && selectedTag !== 'all' ? tagData : postsData
  const posts = displayData?.posts || []
  const total = displayData?.total || 0

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <PostSearchBar onSearch={handleSearch} />
            <PostsFilters onTagChange={handleTagChange} />
          </div>

          {isLoading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostsTable
              posts={posts}
              searchQuery={searchQuery}
              onPostDetail={handlePostDetail}
              onPostEdit={handlePostEdit}
              onPostDelete={handlePostDelete}
              onTagClick={handleTagClick}
              onAuthorClick={handleAuthorClick}
            />
          )}

          <PostsPagination
            total={total}
            skip={skip}
            limit={limit}
            onSkipChange={handleSkipChange}
            onLimitChange={handleLimitChange}
          />
        </div>
      </CardContent>

      <PostCreateDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
      <PostUpdateDialog post={selectedPost} open={showEditDialog} onOpenChange={setShowEditDialog} />
      <PostDetailDialog post={selectedPost} searchQuery={searchQuery} open={showPostDetail} onOpenChange={setShowPostDetail} />
      <UserModal user={userData || null} open={showUserModal} onOpenChange={setShowUserModal} />
    </Card>
  )
}
