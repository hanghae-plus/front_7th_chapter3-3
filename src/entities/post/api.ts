import { apiClient } from "@/shared/api"
import { Post, PostsResponse, NewPost } from "./types"
import { User } from "../user/types"

interface UsersResponse {
  users: User[]
}

export const postApi = {
  async getPosts(limit: number, skip: number): Promise<{ posts: Post[]; total: number }> {
    const [postsData, usersData] = await Promise.all([
      apiClient<PostsResponse>("/posts", { params: { limit, skip } }),
      apiClient<UsersResponse>("/users", { params: { limit: 0, select: "username,image" } }),
    ])

    const postsWithUsers = postsData.posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId),
    }))

    return { posts: postsWithUsers, total: postsData.total }
  },

  async searchPosts(query: string): Promise<{ posts: Post[]; total: number }> {
    const data = await apiClient<PostsResponse>(`/posts/search`, { params: { q: query } })
    return { posts: data.posts, total: data.total }
  },

  async getPostsByTag(tag: string): Promise<{ posts: Post[]; total: number }> {
    const [postsData, usersData] = await Promise.all([
      apiClient<PostsResponse>(`/posts/tag/${tag}`),
      apiClient<UsersResponse>("/users", { params: { limit: 0, select: "username,image" } }),
    ])

    const postsWithUsers = postsData.posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId),
    }))

    return { posts: postsWithUsers, total: postsData.total }
  },

  async addPost(post: NewPost): Promise<Post> {
    return apiClient<Post>("/posts/add", {
      method: "POST",
      body: JSON.stringify(post),
    })
  },

  async updatePost(id: number, post: Partial<Post>): Promise<Post> {
    return apiClient<Post>(`/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify(post),
    })
  },

  async deletePost(id: number): Promise<void> {
    await apiClient(`/posts/${id}`, { method: "DELETE" })
  },
}
