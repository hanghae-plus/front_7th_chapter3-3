import type { Post } from '../model/types'
import { API_BASE_URL } from '../../../shared/config'

export interface CreatePostDto {
  title: string
  body: string
  userId: number
}

export interface UpdatePostDto {
  title?: string
  body?: string
}

export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface Tag {
  url: string
  slug: string
}

export const postApi = {
  // 게시물 목록 조회
  getPosts: async (limit: number, skip: number): Promise<PostsResponse> => {
    const response = await fetch(`${API_BASE_URL}/posts?limit=${limit}&skip=${skip}`)
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    return response.json()
  },

  // 게시물 단건 조회
  getPost: async (id: number): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${id}`)
    }
    return response.json()
  },

  // 게시물 생성
  createPost: async (post: CreatePostDto): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    if (!response.ok) {
      throw new Error('Failed to create post')
    }
    return response.json()
  },

  // 게시물 수정
  updatePost: async (id: number, post: UpdatePostDto): Promise<Post> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    if (!response.ok) {
      throw new Error(`Failed to update post: ${id}`)
    }
    return response.json()
  },

  // 게시물 삭제
  deletePost: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`Failed to delete post: ${id}`)
    }
  },

  // 게시물 검색
  searchPosts: async (query: string): Promise<PostsResponse> => {
    const response = await fetch(`${API_BASE_URL}/posts/search?q=${query}`)
    if (!response.ok) {
      throw new Error('Failed to search posts')
    }
    return response.json()
  },

  // 태그별 게시물 조회
  getPostsByTag: async (tag: string): Promise<PostsResponse> => {
    const response = await fetch(`${API_BASE_URL}/posts/tag/${tag}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch posts by tag: ${tag}`)
    }
    return response.json()
  },

  // 태그 목록 조회
  getTags: async (): Promise<Tag[]> => {
    const response = await fetch(`${API_BASE_URL}/posts/tags`)
    if (!response.ok) {
      throw new Error('Failed to fetch tags')
    }
    return response.json()
  },
}
