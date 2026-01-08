/**
 * Post 엔티티 Zustand Store
 * 
 * 게시물 관련 전역 상태 관리
 * @see mockdowns/PLANS/state-management-plan.md - 상태 관리 계획 참고
 */

import { create } from "zustand"
import type { Post, FetchPostsParams } from "./types"
import { fetchPosts as fetchPostsAPI, addPost as addPostAPI, updatePost as updatePostAPI, deletePost as deletePostAPI } from "../api"
import { fetchUsers } from "../../user/api"
import type { User } from "../../user/model/types"

// Post Store 상태 인터페이스
export interface PostState {
  // 기본 상태
  posts: Post[]
  total: number
  loading: boolean
  error: string | null
  
  // 필터링/검색 상태
  searchQuery: string
  selectedTag: string
  tags: string[]
  sortBy: string
  sortOrder: "asc" | "desc"
  selectedPost: Post | null
  
  // 페이지네이션 상태
  skip: number
  limit: number
  
  // 새 게시물 작성 상태
  newPost: { title: string; body: string; userId: number }
  
  // 액션
  fetchPosts: (params?: FetchPostsParams) => Promise<void>
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (sortBy: string) => void
  setSortOrder: (order: "asc" | "desc") => void
  setTags: (tags: string[]) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void
  setSelectedPost: (post: Post | null) => void
  setNewPost: (post: { title: string; body: string; userId: number }) => void
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  addPost: (post: { title: string; body: string; userId: number }) => Promise<void>
  updatePost: (id: number, post: { title?: string; body?: string }) => Promise<void>
  deletePost: (id: number) => Promise<void>
  reset: () => void
}

// 초기 상태
const initialState = {
  posts: [],
  total: 0,
  loading: false,
  error: null,
  searchQuery: "",
  selectedTag: "all", // 초기값: 모든 태그 선택
  tags: [],
  sortBy: "id", // 초기 정렬 기준: id (최신순)
  sortOrder: "desc" as const, // 초기 정렬 순서: desc
  selectedPost: null,
  skip: 0,
  limit: 10,
  newPost: { title: "", body: "", userId: 1 },
}

// Post Store 생성
export const usePostStore = create<PostState>((set, get) => ({
  ...initialState,
  
  // 게시물 목록 조회
  fetchPosts: async (params?: FetchPostsParams) => {
    set({ loading: true, error: null })
    try {
      const state = get()
      // 정렬 상태를 포함한 파라미터 생성
      const fetchParams: FetchPostsParams = {
        limit: params?.limit ?? state.limit,
        skip: params?.skip ?? state.skip,
        sortBy: params?.sortBy ?? (state.sortBy || undefined),
        sortOrder: params?.sortOrder ?? (state.sortOrder || undefined),
      }
      
      // 게시물과 사용자 정보를 동시에 조회
      const [postsResponse, usersResponse] = await Promise.all([
        fetchPostsAPI(fetchParams),
        fetchUsers({ limit: 0, select: "username,image" }),
      ])

      // 게시물과 사용자 정보 결합
      const postsWithUsers = postsResponse.posts.map((post: Post) => ({
        ...post,
        author: usersResponse.users.find((user: User) => user.id === post.userId),
      }))

      set({
        posts: postsWithUsers,
        total: postsResponse.total,
        loading: false,
        error: null,
      })
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "게시물 조회 실패",
      })
    }
  },
  
  // 검색어 설정
  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
  },
  
  // 선택된 태그 설정
  setSelectedTag: (tag: string) => {
    set({ selectedTag: tag })
  },
  
  // 정렬 기준 설정
  setSortBy: (sortBy: string) => {
    set({ sortBy })
  },
  
  // 정렬 순서 설정
  setSortOrder: (order: "asc" | "desc") => {
    set({ sortOrder: order })
  },
  
  // 태그 목록 설정
  setTags: (tags: string[]) => {
    set({ tags })
  },
  
  // Skip 설정
  setSkip: (skip: number) => {
    set({ skip })
  },
  
  // Limit 설정
  setLimit: (limit: number) => {
    set({ limit })
  },
  
  // 선택된 게시물 설정
  setSelectedPost: (post: Post | null) => {
    set({ selectedPost: post })
  },
  
  // 새 게시물 작성 상태 설정
  setNewPost: (post: { title: string; body: string; userId: number }) => {
    set({ newPost: post })
  },
  
  // 게시물 목록 설정
  setPosts: (posts: Post[]) => {
    set({ posts })
  },
  
  // 전체 개수 설정
  setTotal: (total: number) => {
    set({ total })
  },
  
  // 로딩 상태 설정
  setLoading: (loading: boolean) => {
    set({ loading })
  },
  
  // 에러 상태 설정
  setError: (error: string | null) => {
    set({ error })
  },
  
  // 게시물 추가
  addPost: async (post: { title: string; body: string; userId: number }) => {
    set({ loading: true, error: null })
    try {
      const newPost = await addPostAPI(post)
      set((state) => ({
        posts: [newPost, ...state.posts],
        total: state.total + 1,
        loading: false,
        error: null,
      }))
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "게시물 추가 실패",
      })
      throw error
    }
  },
  
  // 게시물 수정
  updatePost: async (id: number, post: { title?: string; body?: string }) => {
    set({ loading: true, error: null })
    try {
      const updatedPostResponse = await updatePostAPI(id, post)
      
      // 기존 게시물의 author 정보를 유지하면서 업데이트
      set((state) => ({
        posts: state.posts.map((p) => {
          if (p.id === id) {
            // API 응답과 기존 post의 author 정보를 결합
            return {
              ...updatedPostResponse,
              author: p.author, // 기존 author 정보 유지
            } as Post
          }
          return p
        }),
        loading: false,
        error: null,
      }))
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "게시물 수정 실패",
      })
      throw error
    }
  },
  
  // 게시물 삭제
  deletePost: async (id: number) => {
    set({ loading: true, error: null })
    try {
      await deletePostAPI(id)
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== id),
        total: state.total - 1,
        loading: false,
        error: null,
      }))
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : "게시물 삭제 실패",
      })
      throw error
    }
  },
  
  // 상태 초기화
  reset: () => {
    set(initialState)
  },
}))

