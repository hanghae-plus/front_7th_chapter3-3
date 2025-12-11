import { useMutation } from "@tanstack/react-query"
import * as postApi from "@/entities/post/api/postApi"

/**
 * 게시물 생성 기능
 *
 * FSD 공식 가이드:
 * "기능 근처 커스텀 훅에서 useMutation 로직과 queryClient 갱신을 함께 정의"
 *
 * 성공 시 캐시 무효화는 UI 컴포넌트 레벨에서 onSuccess 콜백으로 처리
 */
export const useCreatePost = () => {
  return useMutation({
    mutationFn: postApi.createPost,
  })
}
