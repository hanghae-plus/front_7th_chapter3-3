import { create } from 'zustand'
import { postApi, type CreatePostDto, type UpdatePostDto, type PostsResponse } from '../api'
import type { Post } from './types'

interface PostStore {
  // 상태
  posts: Post[]
  total: number
  loading: boolean
  error: string | null
  selectedPost: Post | null

  // API 호출 + 상태 관리 함수들 (순수 Post 도메인만)
  fetchPosts: (limit: number, skip: number) => Promise<PostsResponse>
  fetchPost: (id: number) => Promise<Post>
  createPost: (post: CreatePostDto) => Promise<Post>
  updatePost: (id: number, post: UpdatePostDto) => Promise<Post>
  deletePost: (id: number) => Promise<void>
  searchPosts: (query: string) => Promise<PostsResponse>
  getPostsByTag: (tag: string) => Promise<PostsResponse>
  
  // 상태 조작 함수들
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSelectedPost: (post: Post | null) => void
  clearError: () => void
  reset: () => void
}

const initialState = {
  posts: [],
  total: 0,
  loading: false,
  error: null,
  selectedPost: null,
}

export const usePostStore = create<PostStore>((set) => ({
  ...initialState,

  // 게시물 목록 조회 (순수 Post API만 호출)
  fetchPosts: async (limit: number, skip: number) => {
    set({ loading: true, error: null })

    try {
      const response = await postApi.getPosts(limit, skip)
      set({
        posts: response.posts,
        total: response.total,
        loading: false,
      })
      return response
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '게시물을 불러오는데 실패했습니다',
        loading: false,
      })
      throw error
    }
  },

  // 게시물 단건 조회
  fetchPost: async (id: number) => {
    set({ loading: true, error: null })
    try {
      const post = await postApi.getPost(id)
      set({ selectedPost: post, loading: false })
      return post
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '게시물을 불러오는데 실패했습니다',
        loading: false,
      })
      throw error
    }
  },

  // 게시물 생성 (API 호출 + 상태 관리)
  createPost: async (post: CreatePostDto) => {
    set({ loading: true, error: null })
    try {
      const createdPost = await postApi.createPost(post)
      set((state) => ({
        posts: [createdPost, ...state.posts],
        total: state.total + 1,
        loading: false,
      }))
      return createdPost
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '게시물 생성에 실패했습니다',
        loading: false,
      })
      throw error
    }
  },

  // 게시물 수정 (API 호출 + 상태 관리)
  updatePost: async (id: number, post: UpdatePostDto) => {
    set({ loading: true, error: null })
    try {
      const updatedPost = await postApi.updatePost(id, post)
      set((state) => ({
        posts: state.posts.map((p) => (p.id === id ? updatedPost : p)),
        selectedPost: state.selectedPost?.id === id ? updatedPost : state.selectedPost,
        loading: false,
      }))
      return updatedPost
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '게시물 수정에 실패했습니다',
        loading: false,
      })
      throw error
    }
  },

  // 게시물 삭제 (API 호출 + 상태 관리)
  deletePost: async (id: number) => {
    set({ loading: true, error: null })
    try {
      await postApi.deletePost(id)
      set((state) => ({
        posts: state.posts.filter((p) => p.id !== id),
        total: state.total - 1,
        selectedPost: state.selectedPost?.id === id ? null : state.selectedPost,
        loading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '게시물 삭제에 실패했습니다',
        loading: false,
      })
      throw error
    }
  },

  // 게시물 검색 (순수 Post API만 호출)
  searchPosts: async (query: string) => {
    if (!query.trim()) {
      throw new Error('검색어를 입력해주세요')
    }

    set({ loading: true, error: null })
    try {
      const response = await postApi.searchPosts(query)
      set({
        posts: response.posts,
        total: response.total,
        loading: false,
      })
      return response
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '검색에 실패했습니다',
        loading: false,
      })
      throw error
    }
  },

  // 태그별 게시물 조회 (순수 Post API만 호출)
  getPostsByTag: async (tag: string) => {
    if (!tag || tag === "all") {
      throw new Error('태그를 선택해주세요')
    }

    set({ loading: true, error: null })
    try {
      const response = await postApi.getPostsByTag(tag)
      set({
        posts: response.posts,
        total: response.total,
        loading: false,
      })
      return response
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : '태그별 게시물 조회에 실패했습니다',
        loading: false,
      })
      throw error
    }
  },

  // 상태 조작 함수들
  setPosts: (posts: Post[]) => set({ posts }),
  setTotal: (total: number) => set({ total }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
  setSelectedPost: (post: Post | null) => set({ selectedPost: post }),
  clearError: () => set({ error: null }),
  reset: () => set(initialState),
}))

