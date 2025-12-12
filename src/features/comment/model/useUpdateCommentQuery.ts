import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Comment } from "../../../entities/comment/model/comment"
import updateCommentApi from "../../../entities/comment/api/updateCommentApi"
import { COMMENTS_QUERY_KEY } from "../../../entities/comment/model/useCommentsQuery"

const useUpdateCommentQuery = () => {
  const queryClient = useQueryClient()

  const { mutate: updateComment, ...rest } = useMutation<
    Comment,
    Error,
    { comment: Comment },
    { previousData: Comment[]; postId: number }
  >({
    mutationFn: ({ comment }: { comment: Comment }) => updateCommentApi({ comment }),
    onMutate: async ({ comment }: { comment: Comment }) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: [COMMENTS_QUERY_KEY, comment.postId] })

      // 이전 데이터 스냅샷 저장
      const previousData = queryClient.getQueryData<Comment[]>([COMMENTS_QUERY_KEY, comment.postId])

      // 낙관적 업데이트
      queryClient.setQueryData(
        [COMMENTS_QUERY_KEY, comment.postId],
        (old: any) => old.map((c: Comment) => (c.id === comment.id ? comment : c)) as Comment[],
      )

      return { previousData: previousData || [], postId: comment.postId }
    },
    onError: (error, _variables, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousData && context?.postId) {
        queryClient.setQueryData([COMMENTS_QUERY_KEY, context.postId], context.previousData)
      }
      console.error("댓글 수정 중 오류 발생:", error)
      alert(`댓글 수정에 실패했습니다: ${error.message}`)
    },
  })

  return { updateComment, ...rest }
}

export default useUpdateCommentQuery
