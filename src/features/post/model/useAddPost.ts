import { postApi } from "@/entities/posts/api/postApi"
import { TPost } from "@/entities/posts/model/types"
import { queryKeys } from "@/shared/lib/queryKeys"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export const useAddPost = () => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })

  const mutation = useMutation({
    mutationFn: (postData: typeof newPost) =>
      postApi.createPost({
        ...postData,
        reactions: { likes: 0, dislikes: 0 },
      }),
    onSuccess: (createdPost) => {
      // 모든 posts.list 관련 캐시에 새 게시물을 뒤에 추가 (낙관적 업데이트)
      queryClient.setQueriesData<{ posts: TPost[]; total: number }>({ queryKey: queryKeys.posts.all }, (old) => {
        if (!old) return old
        return {
          posts: [...old.posts, createdPost],
          total: old.total + 1,
        }
      })

      setIsOpen(false)
      setNewPost({ title: "", body: "", userId: 1 })
    },
  })

  return {
    isOpen,
    setIsOpen,
    newPost,
    setNewPost,
    handleSubmit: () => mutation.mutate(newPost),
    isLoading: mutation.isPending,
  }
}
