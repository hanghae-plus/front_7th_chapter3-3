import { Post } from "@/entities/post/model/post"
import { usePostMutations } from "@/entities/post/model"

interface UsePostHandlersProps {
  refetchPosts: (options?: { skip: number; limit: number }) => void
  setShowAddDialog: (show: boolean) => void
  setShowEditDialog: (show: boolean) => void
  setShowPostDetailDialog: (show: boolean) => void
  setSelectedPost: (post: Post | null) => void
  setCurrentPostId: (id: number | null) => void
  loadComments: (postId: number) => void
  skip: number
  limit: number
}

export const usePostHandlers = ({
  refetchPosts,
  setShowAddDialog,
  setShowEditDialog,
  setShowPostDetailDialog,
  setSelectedPost,
  setCurrentPostId,
  loadComments,
  skip,
  limit,
}: UsePostHandlersProps) => {
  const { createPost, updatePost, deletePost } = usePostMutations({
    onSuccess: () => {
      refetchPosts()
    },
  })

  const handleAddPost = async (post: { title: string; body: string; userId: number }) => {
    await createPost(post, {
      onSuccess: () => {
        setShowAddDialog(false)
        refetchPosts({ skip, limit })
      },
    })
  }

  const handleUpdatePost = async (selectedPost: Post | null) => {
    if (!selectedPost) return
    await updatePost(selectedPost, {
      onSuccess: () => {
        setShowEditDialog(false)
        refetchPosts({ skip, limit })
      },
    })
  }

  const handleDeletePost = async (id: number) => {
    await deletePost(id)
    refetchPosts({ skip, limit })
  }

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setCurrentPostId(post.id)
    loadComments(post.id)
    setShowPostDetailDialog(true)
  }

  return {
    handleAddPost,
    handleUpdatePost,
    handleDeletePost,
    openPostDetail,
  }
}
