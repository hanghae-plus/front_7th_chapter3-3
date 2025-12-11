import { Post } from "@/entities/post/model/post"

export const addPost = async (newPost: Partial<Post>) => {
  const response = await fetch("/api/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  return await response.json()
}
