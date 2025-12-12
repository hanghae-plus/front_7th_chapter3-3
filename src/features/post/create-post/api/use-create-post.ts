import { useMutation } from "@tanstack/react-query"
import * as postApi from "@/entities/post/api/postApi"

/**
 * 게시물 생성 기능
 *
 * 성공 시 캐시 무효화는 UI 컴포넌트 레벨에서 onSuccess 콜백으로 처리
 */
export const useCreatePost = () => {
  return useMutation({
    mutationFn: postApi.createPost,
  })
}
