import { useMutation, useQueryClient } from "@tanstack/react-query"
import likeCommentApi from "../../../entities/comment/api/likeCommentApi"
import { Comment } from "../../../entities/comment/model/comment"
import { COMMENTS_QUERY_KEY } from "../../../entities/comment/model/useCommentsQuery"

interface LikeCommentParams {
  id: number
  postId: number
  likes: number
}

const useLikeCommentQuery = () => {
  const queryClient = useQueryClient()

  const { mutate: likeComment, ...rest } = useMutation<
    Comment,
    Error,
    LikeCommentParams,
    { previousData: Comment[]; postId: number }
  >({
    mutationFn: ({ id, likes }: LikeCommentParams) => likeCommentApi({ id, likes }),
    onMutate: async ({ id, postId }: LikeCommentParams) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: [COMMENTS_QUERY_KEY, postId] })

      // 이전 데이터 스냅샷 저장
      const previousData = queryClient.getQueryData<Comment[]>([COMMENTS_QUERY_KEY, postId])

      // 낙관적 업데이트
      queryClient.setQueryData(
        [COMMENTS_QUERY_KEY, postId],
        (old: any) => old.map((c: Comment) => (c.id === id ? { ...c, likes: c.likes + 1 } : c)) as Comment[],
      )

      return { previousData: previousData || [], postId }
    },
    onError: (error, _variables, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousData && context?.postId) {
        queryClient.setQueryData([COMMENTS_QUERY_KEY, context.postId], context.previousData)
      }
      console.error("댓글 좋아요 중 오류 발생:", error)
      alert(`댓글 좋아요에 실패했습니다: ${error.message}`)
    },
  })

  return { likeComment, ...rest }
}

export default useLikeCommentQuery
