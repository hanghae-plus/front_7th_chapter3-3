import { create } from "zustand"
import { Post, NewPost } from "./types"
import { postApi } from "../api/postApi"

interface PostState {
  // 상태
  posts: Post[]
  total: number
  loading: boolean

  // 액션
  setPosts: (posts: Post[]) => void
  setTotal: (total: number) => void
  setLoading: (loading: boolean) => void
  addPost: (newPost: NewPost) => Promise<Post | undefined>
  updatePost: (post: Post) => Promise<Post | undefined>
  deletePost: (id: number) => Promise<void>
}

export const usePostStore = create<PostState>((set) => ({
  // 초기 상태
  posts: [],
  total: 0,
  loading: false,

  // 세터
  setPosts: (posts) => set({ posts }),
  setTotal: (total) => set({ total }),
  setLoading: (loading) => set({ loading }),

  // 게시물 추가
  addPost: async (newPost) => {
    const data = await postApi.addPost(newPost)
    if (data) {
      set((state) => ({ posts: [data, ...state.posts] }))
    }
    return data
  },

  // 게시물 수정
  updatePost: async (post) => {
    const data = await postApi.updatePost(post)
    if (data) {
      set((state) => ({
        posts: state.posts.map((p) => (p.id === data.id ? data : p)),
      }))
    }
    return data
  },

  // 게시물 삭제
  deletePost: async (id) => {
    await postApi.deletePost(id)
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    }))
  },
}))

