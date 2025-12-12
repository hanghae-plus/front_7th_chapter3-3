import { useDeletePost } from '@/entities/post/api/queries'

export const usePostDelete = () => {
  const deletePost = useDeletePost()

  const handleDelete = (postId: number, postTitle: string) => {
    if (confirm(`"${postTitle}" 게시물을 삭제하시겠습니까?`)) {
      deletePost.mutate(postId)
    }
  }

  return {
    handleDelete,
    isPending: deletePost.isPending,
  }
}
