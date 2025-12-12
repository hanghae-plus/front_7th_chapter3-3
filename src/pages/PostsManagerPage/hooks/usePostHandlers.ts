import { Post } from "@/entities/post/model/post"
import { usePostMutations } from "@/entities/post/model"
import { User } from "@/entities/user/model/user"

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
  addPostToState: (post: Post) => void
  removePostFromState: (postId: number) => void
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
  addPostToState,
  removePostFromState,
}: UsePostHandlersProps) => {
  const { createPost, updatePost, deletePost } = usePostMutations({
    onSuccess: () => {
      refetchPosts()
    },
  })

  const handleAddPost = async (post: { title: string; body: string; userId: number }) => {
    await createPost(post, {
      onSuccess: async (_message, createdPost) => {
        setShowAddDialog(false)
        if (createdPost) {
          // 사용자 정보를 가져와서 게시물에 추가
          try {
            const usersResponse = await fetch("/api/users?limit=0&select=username,image")
            const usersData = await usersResponse.json()
            const users = usersData.users as User[]
            const author = users.find((user) => user.id === createdPost.userId)
            const postWithAuthor = { ...createdPost, author }
            addPostToState(postWithAuthor)
          } catch (error) {
            console.error("사용자 정보 가져오기 오류:", error)
            // 실패하면 전체 재조회
            refetchPosts({ skip, limit })
          }
        } else {
          // createdPost가 없으면 전체 재조회
          refetchPosts({ skip, limit })
        }
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
    await deletePost(id, {
      onSuccess: () => {
        // 즉시 UI에서 제거
        removePostFromState(id)
      },
    })
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
