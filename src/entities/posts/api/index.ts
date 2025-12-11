import { Post } from "../types"

export const fetchPosts = async (limit: number, skip: number) => {
  const response = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  return response.json()
}

export const fetchTags = async () => {
  const response = await fetch("/api/posts/tags")
  return response.json()
}

export const searchPosts = async (query: string) => {
  const response = await fetch(`/api/posts/search?q=${query}`)
  return response.json()
}

export const fetchPostsByTag = async (tag: string) => {
  const response = await fetch(`/api/posts/tag/${tag}`)
  return response.json()
}

export const createPost = async (post: { title: string; body: string; userId: number }) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  return response.json()
}

export const updatePost = async (postId: number, post: Partial<Post>) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  return response.json()
}

export const deletePost = async (postId: number) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  })
  return response.json()
}
