import { useQuery } from '@tanstack/react-query'
import { commentApi } from '../../../entities/comment/api'
import { commentKeys } from '../../../shared/lib'

/**
 * 댓글 목록 조회 기능
 */
export const useCommentList = (postId: number) => {
  return useQuery({
    queryKey: commentKeys.list(postId),
    queryFn: () => commentApi.getCommentsByPost(postId),
    enabled: postId > 0, // postId가 유효할 때만 실행
  })
}
