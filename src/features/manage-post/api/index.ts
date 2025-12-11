import { Post } from "@/entities/post/model/types"

const isDev = import.meta.env.DEV
const BASE_URL = isDev ? "/api" : "https://dummyjson.com"

// 1. 게시글 추가
// (ID는 서버에서 생성하므로 title, body, userId만 보냅니다)
export const addPostApi = async (newPost: { title: string; body: string; userId: number }) => {
  const response = await fetch(`${BASE_URL}/posts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  return response.json()
}

// 2. 게시글 수정
export const updatePostApi = async (post: Post) => {
  const response = await fetch(`${BASE_URL}/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  return response.json()
}

// 3. 게시글 삭제
export const deletePostApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  })
  return response.json()
}
