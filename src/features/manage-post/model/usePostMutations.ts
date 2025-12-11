import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addPostApi, updatePostApi, deletePostApi } from "@/entities/post/api"
import { Post } from "@/entities/post/model/types"

export const usePostMutations = () => {
  const queryClient = useQueryClient()

  // 1. 게시글 추가 (화면에 강제 추가)
  const addMutation = useMutation({
    mutationFn: addPostApi,
    onSuccess: (newPost) => {
      // 'postList'로 시작하는 모든 쿼리 데이터를 찾아서 수정
      queryClient.setQueriesData({ queryKey: ["postList"] }, (oldData: any) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          posts: [newPost, ...oldData.posts], // 새 글을 맨 위에 붙임
          total: oldData.total + 1,
        }
      })
    },
  })

  // 2. 게시글 수정 & 좋아요 (화면 강제 수정)
  const updateMutation = useMutation({
    mutationFn: updatePostApi,
    onSuccess: (updatedPost) => {
      queryClient.setQueriesData({ queryKey: ["postList"] }, (oldData: any) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          posts: oldData.posts.map((post: Post) => {
            // ID가 같은 글을 찾아서 새 정보로 갈아치움
            if (post.id === updatedPost.id) {
              return {
                ...post, // 기존 정보 유지 (작성자 정보 등)
                ...updatedPost, // 수정된 정보 덮어쓰기 (제목, 좋아요 등)
              }
            }
            return post
          }),
        }
      })
    },
  })

  // 3. 게시글 삭제 (화면 강제 삭제)
  const deleteMutation = useMutation({
    mutationFn: deletePostApi,
    onSuccess: (deletedPost) => {
      queryClient.setQueriesData({ queryKey: ["postList"] }, (oldData: any) => {
        if (!oldData) return oldData
        return {
          ...oldData,
          // 삭제된 ID를 가진 글만 빼고 남김
          posts: oldData.posts.filter((post: Post) => post.id !== deletedPost.id),
          total: oldData.total - 1,
        }
      })
    },
  })

  return {
    addPost: addMutation.mutate,
    updatePost: updateMutation.mutate,
    deletePost: deleteMutation.mutate,
  }
}
