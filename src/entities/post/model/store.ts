import { create } from "zustand"
import { Post, NewPost } from "../types"
import { postApi } from "../api"

interface PostState {
  posts: Post[]
  total: number
  selectedPost: Post | null
  loading: boolean

  // Actions
  fetchPosts: (limit: number, skip: number) => Promise<void>
  searchPosts: (query: string) => Promise<void>
  fetchPostsByTag: (tag: string) => Promise<void>
  addPost: (post: NewPost) => Promise<void>
  updatePost: (id: number, post: Partial<Post>) => Promise<void>
  deletePost: (id: number) => Promise<void>
  setSelectedPost: (post: Post | null) => void
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  total: 0,
  selectedPost: null,
  loading: false,

  fetchPosts: async (limit, skip) => {
    set({ loading: true })
    try {
      const { posts, total } = await postApi.getPosts(limit, skip)
      set({ posts, total })
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  searchPosts: async (query) => {
    set({ loading: true })
    try {
      const { posts, total } = await postApi.searchPosts(query)
      set({ posts, total })
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  fetchPostsByTag: async (tag) => {
    set({ loading: true })
    try {
      const { posts, total } = await postApi.getPostsByTag(tag)
      set({ posts, total })
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    } finally {
      set({ loading: false })
    }
  },

  addPost: async (newPost) => {
    try {
      const post = await postApi.addPost(newPost)
      set({ posts: [post, ...get().posts] })
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  },

  updatePost: async (id, postData) => {
    try {
      const updated = await postApi.updatePost(id, postData)
      set({
        posts: get().posts.map((post) => (post.id === id ? updated : post)),
      })
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  },

  deletePost: async (id) => {
    try {
      await postApi.deletePost(id)
      set({ posts: get().posts.filter((post) => post.id !== id) })
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  },

  setSelectedPost: (post) => set({ selectedPost: post }),
}))
