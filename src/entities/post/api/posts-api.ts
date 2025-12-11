import { NewPost, Post, PostsResponse } from "../model"

export const postsApi = {
  // 게시물 목록 조회
  getPosts: async (limit: number, skip: number): Promise<PostsResponse> => {
    const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    return response.json()
  },

  // 게시물 검색
  searchPosts: async (query: string): Promise<PostsResponse> => {
    const response = await fetch(`/api/posts/search?q=${query}`)
    return response.json()
  },

  // 태그별 게시물 조회
  getPostsByTag: async (tag: string): Promise<PostsResponse> => {
    const response = await fetch(`/api/posts/tag/${tag}`)
    return response.json()
  },

  // 게시물 추가
  createPost: async (post: NewPost): Promise<Post> => {
    const response = await fetch(`/api/posts/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return response.json()
  },

  // 게시물 수정
  updatePost: async (id: number, post: Partial<Post>): Promise<Post> => {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return response.json()
  },

  // 게시물 삭제
  deletePost: async (id: number): Promise<void> => {
    await fetch(`/api/posts/${id}`, { method: "DELETE" })
  },
}
