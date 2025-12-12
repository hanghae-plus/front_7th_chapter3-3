import { Post, PostsResponse } from "../model/types"

export const fetchPosts = async (params: {
  limit: number
  skip: number
  sortBy?: string
  order?: string
}): Promise<PostsResponse> => {
  const queryParams = new URLSearchParams({
    limit: String(params.limit),
    skip: String(params.skip),
  })

  if (params.sortBy && params.sortBy !== "none") {
    queryParams.append("sortBy", params.sortBy)
    // order는 sortBy가 있을 때만 의미가 있음
    if (params.order) {
      queryParams.append("order", params.order)
    }
  }

  const response = await fetch(`/api/posts?${queryParams.toString()}`)
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
