import { postApi } from "@/entities/posts/api/postApi"
import { TPost } from "@/entities/posts/model/types"
import { queryKeys } from "@/shared/lib/queryKeys"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (id: number) => {
      if (!confirm("정말 삭제하시겠습니까?")) {
        return Promise.reject(new Error("User cancelled"))
      }
      return postApi.deletePost(id)
    },
    onSuccess: (_data, deletedId) => {
      // 모든 posts 캐시에서 삭제된 게시물 제거 (낙관적 업데이트)
      queryClient.setQueriesData<{ posts: TPost[]; total: number }>({ queryKey: queryKeys.posts.all }, (old) => {
        if (!old) return old
        return {
          posts: old.posts.filter((p) => p.id !== deletedId),
          total: old.total - 1,
        }
      })
    },
  })

  return {
    handleDelete: mutation.mutate,
    isLoading: mutation.isPending,
  }
}
