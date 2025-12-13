import { Post } from "@/entities/post/model/post"

export const updatePost = async (post: Post) => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  return await response.json()
}
