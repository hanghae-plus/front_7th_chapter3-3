import { useMutation, useQueryClient } from "@tanstack/react-query"
import deleteCommentApi from "../../../entities/comment/api/deleteCommentApi"
import { COMMENTS_QUERY_KEY } from "../../../entities/comment/model/useCommentsQuery"
import { Comment } from "../../../entities/comment/model/comment"

interface DeleteCommentParams {
  id: number
  postId: number
}

const useDeleteCommentQuery = () => {
  const queryClient = useQueryClient()

  const { mutate: deleteComment, ...rest } = useMutation<
    void,
    Error,
    DeleteCommentParams,
    { previousData: Comment[]; postId: number }
  >({
    mutationFn: ({ id }: DeleteCommentParams) => deleteCommentApi({ id }),
    onMutate: async ({ id, postId }: DeleteCommentParams) => {
      // 진행 중인 쿼리 취소
      await queryClient.cancelQueries({ queryKey: [COMMENTS_QUERY_KEY, postId] })

      // 이전 데이터 스냅샷 저장
      const previousData = queryClient.getQueryData<Comment[]>([COMMENTS_QUERY_KEY, postId])

      // 낙관적 업데이트
      queryClient.setQueryData(
        [COMMENTS_QUERY_KEY, postId],
        (old: any) => old.filter((c: Comment) => c.id !== id) as Comment[],
      )

      return { previousData: previousData || [], postId }
    },
    onError: (error, _variables, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousData && context?.postId) {
        queryClient.setQueryData([COMMENTS_QUERY_KEY, context.postId], context.previousData)
      }
      console.error("댓글 삭제 중 오류 발생:", error)
      alert(`댓글 삭제에 실패했습니다: ${error.message}`)
    },
  })

  return { deleteComment, ...rest }
}

export default useDeleteCommentQuery
