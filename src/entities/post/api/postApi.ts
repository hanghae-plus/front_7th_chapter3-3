import { Post, PostsResponse } from "../model/types"

export const fetchPosts = async (params: { limit: number; skip: number }): Promise<PostsResponse> => {
  const response = await fetch(`/api/posts?limit=${params.limit}&skip=${params.skip}`)
  return response.json()
}

export const fetchPostsByTag = async (tag: string): Promise<PostsResponse> => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  return response.json()
}

export const searchPosts = async (query: string): Promise<PostsResponse> => {
  const response = await fetch(`/api/posts/search?q=${query}`)
  return response.json()
}

export const createPost = async (post: { title: string; body: string; userId: number }): Promise<Post> => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  return response.json()
}

export const updatePost = async (id: number, post: Partial<Post>): Promise<Post> => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  return response.json()
}

export const deletePost = async (id: number): Promise<void> => {
  await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
}
