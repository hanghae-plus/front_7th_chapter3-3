import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as postApi from "../api/postApi"
import { postQueries } from "../queries"
import type { Post } from "../model/types"

/**
 * 게시물 생성 Mutation
 *
 * 성공 시:
 * - 모든 게시물 목록 캐시 무효화 (새 게시물이 목록에 반영되도록)
 */
export const useCreatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postApi.createPost,
    onSuccess: () => {
      // 모든 게시물 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: postQueries.lists() })
    },
  })
}

/**
 * 게시물 수정 Mutation
 *
 * 성공 시:
 * - 모든 게시물 목록 캐시 무효화 (수정된 내용이 목록에 반영되도록)
 */
export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, post }: { id: number; post: Partial<Post> }) => postApi.updatePost(id, post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueries.lists() })
    },
  })
}

/**
 * 게시물 삭제 Mutation
 *
 * 성공 시:
 * - 모든 게시물 목록 캐시 무효화 (삭제된 게시물이 목록에서 제거되도록)
 */
export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: postApi.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postQueries.lists() })
    },
  })
}
