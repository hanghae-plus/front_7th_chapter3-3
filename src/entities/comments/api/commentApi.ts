import { TComment } from "@/entities/comments/model/types"
import { apiClient } from "@/shared/api"

/**
 * Comment API - 순수 API 호출만 담당
 * 상태 관리(loading, error 등)는 hooks에서 처리
 */
export const commentApi = {
  // 조회
  getCommentsByPostId: (postId: number) => apiClient.get<{ comments: TComment[] }>(`/comments/post/${postId}`),

  // 생성/수정/삭제
  createComment: (data: Omit<TComment, "id" | "likes">) => apiClient.post<TComment>("/comments/add", data),

  updateComment: (id: number, data: Partial<TComment>) => apiClient.put<TComment>(`/comments/${id}`, data),

  deleteComment: (id: number) => apiClient.delete<void>(`/comments/${id}`),

  // 좋아요
  likeComment: (id: number, currentLikes: number) =>
    apiClient.patch<TComment>(`/comments/${id}`, { likes: currentLikes + 1 }),
}
