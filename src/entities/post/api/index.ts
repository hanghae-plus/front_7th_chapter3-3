import { apiClient } from "@/shared/api/client"
import type { Post, PostsResponse, CreatePostDto, UpdatePostDto } from "@/shared/types"

const API_BASE = "/api"

export const postApi = {
  async getPosts(params: { limit: number; skip: number }): Promise<PostsResponse> {
    return apiClient.get<PostsResponse>(`${API_BASE}/posts?limit=${params.limit}&skip=${params.skip}`)
  },

  async searchPosts(query: string): Promise<PostsResponse> {
    return apiClient.get<PostsResponse>(`${API_BASE}/posts/search?q=${query}`)
  },

  async getPostsByTag(tag: string): Promise<PostsResponse> {
    return apiClient.get<PostsResponse>(`${API_BASE}/posts/tag/${tag}`)
  },

  async createPost(data: CreatePostDto): Promise<Post> {
    return apiClient.post<Post>(`${API_BASE}/posts/add`, data)
  },

  async updatePost(id: number, data: UpdatePostDto): Promise<Post> {
    return apiClient.put<Post>(`${API_BASE}/posts/${id}`, data)
  },

  async deletePost(id: number): Promise<void> {
    return apiClient.delete(`${API_BASE}/posts/${id}`)
  },

  async likePost(id: number, likes: number): Promise<Post> {
    return apiClient.patch<Post>(`${API_BASE}/posts/${id}`, { reactions: { likes: likes + 1 } })
  },

  async dislikePost(id: number, dislikes: number): Promise<Post> {
    return apiClient.patch<Post>(`${API_BASE}/posts/${id}`, { reactions: { dislikes: dislikes + 1 } })
  },
}
