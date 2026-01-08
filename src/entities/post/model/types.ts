/**
 * Post 엔티티 타입 정의
 *
 * @see mockdowns/RULES/api-response-structure.md - API 응답 구조 참고
 */

import type { User } from "../../user/model/types"

// 반응 정보
export interface Reactions {
  likes: number
  dislikes: number
}

// 게시물 정보
export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: Reactions
  views: number
  // 클라이언트에서 추가되는 필드 (author 정보)
  author?: User
}

// API 응답 타입
export interface PostResponse {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: Reactions
  views: number
}

export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface TagsResponse {
  tags: string[]
}

// DTO 타입
export interface CreatePostDto {
  title: string
  body: string
  userId: number
}

export interface UpdatePostDto {
  title?: string
  body?: string
}

// Posts API 파라미터
export interface FetchPostsParams {
  limit?: number
  skip?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}
