import { useMutation, useQueryClient } from "@tanstack/react-query"
import updatePostApi from "../../../entities/post/api/updatePostApi"
import { Post } from "../../../entities/post/model/post"
import { POST_QUERY_KEY } from "../../../entities/post/model/usePostQuery"
import usePostParams from "./usePostParams"

const useEditPostQuery = () => {
  const queryClient = useQueryClient()
  const { params } = usePostParams()
  const { mutate: updatePost } = useMutation<
    Post,
    Error,
    { post: Post },
    { previousData: { posts: Post[]; total: number; skip: number; limit: number } }
  >({
    mutationFn: ({ post }: { post: Post }) => updatePostApi({ post }),
    onMutate: async ({ post }: { post: Post }) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: [POST_QUERY_KEY, params] })

      // 이전 데이터 스냅샷 저장
      const previousData = queryClient.getQueryData<{ posts: Post[]; total: number; skip: number; limit: number }>([
        POST_QUERY_KEY,
        params,
      ])

      // 낙관적 업데이트
      queryClient.setQueryData([POST_QUERY_KEY, params], (old: any) => ({
        ...old,
        posts: old.posts.map((p: Post) => (p.id === post.id ? { ...p, ...post } : p)),
      }))

      return { previousData: previousData || { posts: [], total: 0, skip: 0, limit: 10 } }
    },
    onError: (error, _variables, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousData) {
        queryClient.setQueryData([POST_QUERY_KEY, params], context.previousData)
      }
      console.error("게시물 수정 중 오류 발생:", error)
      alert(`게시물 수정에 실패했습니다: ${error.message}`)
    },
  })
  return { updatePost }
}

export default useEditPostQuery
