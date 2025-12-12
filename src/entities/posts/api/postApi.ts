import { TPost } from "@/entities/posts/model/types"
import { apiClient } from "@/shared/api"

/**
 * Post API - 순수 API 호출만 담당
 * 상태 관리(loading, error 등)는 hooks에서 처리
 */
export const postApi = {
  // 조회
  getPosts: (limit: number, skip: number) =>
    apiClient.get<{ posts: TPost[]; total: number }>(`/posts?limit=${limit}&skip=${skip}`),

  getPostById: (id: number) => apiClient.get<TPost>(`/posts/${id}`),

  getPostsByTag: (tag: string) => apiClient.get<{ posts: TPost[]; total: number }>(`/posts/tag/${tag}`),

  searchPosts: (query: string) => apiClient.get<{ posts: TPost[]; total: number }>(`/posts/search?q=${query}`),

  getTags: () => apiClient.get<{ slug: string; name: string; url: string }[]>("/posts/tags"),

  // 생성/수정/삭제
  createPost: (data: Omit<TPost, "id">) => apiClient.post<TPost>("/posts/add", data),

  updatePost: (id: number, data: Partial<TPost>) => apiClient.put<TPost>(`/posts/${id}`, data),

  deletePost: (id: number) => apiClient.delete<void>(`/posts/${id}`),
}
