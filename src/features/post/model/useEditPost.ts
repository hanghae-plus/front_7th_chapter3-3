import { postApi } from "@/entities/posts/api/postApi"
import { TPost } from "@/entities/posts/model/types"
import { queryKeys } from "@/shared/lib/queryKeys"
import { useDialogStore } from "@/shared/store/dialogStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useEditPost = () => {
  const queryClient = useQueryClient()
  const { editingPost } = useDialogStore()

  const mutation = useMutation({
    mutationFn: () => {
      if (!editingPost) return Promise.reject(new Error("No post selected"))
      return postApi.updatePost(editingPost.id, editingPost)
    },
    onSuccess: () => {
      if (!editingPost) return
      // 모든 posts 캐시에서 수정된 게시물 업데이트 (낙관적 업데이트)
      queryClient.setQueriesData<{ posts: TPost[]; total: number }>({ queryKey: queryKeys.posts.all }, (old) => {
        if (!old) return old
        return {
          ...old,
          posts: old.posts.map((p) => (p.id === editingPost.id ? { ...p, ...editingPost } : p)),
        }
      })
    },
  })

  return {
    handleSubmit: () => mutation.mutateAsync(),
    isLoading: mutation.isPending,
  }
}
