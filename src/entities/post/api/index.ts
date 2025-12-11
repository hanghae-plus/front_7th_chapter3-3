import { PostResponse } from "../model/types"

const isDev = import.meta.env.DEV
const BASE_URL = isDev ? "/api" : "https://dummyjson.com"

// 공통으로 사용할 URL 파라미터 생성 함수
const makeParams = (limit: number, skip: number, sortBy?: string, sortOrder?: string) => {
  let params = `limit=${limit}&skip=${skip}`
  if (sortBy && sortBy !== "none") {
    params += `&sortBy=${sortBy}&order=${sortOrder}`
  }
  return params
}

// 1. 기본 목록 조회
export const getPosts = async (
  limit: number,
  skip: number,
  sortBy?: string,
  sortOrder?: string,
): Promise<PostResponse> => {
  const params = makeParams(limit, skip, sortBy, sortOrder)
  // ✅ /api 대신 BASE_URL 사용
  const response = await fetch(`${BASE_URL}/posts?${params}`)
  return response.json()
}

// 2. 검색어 조회
export const searchPosts = async (
  query: string,
  limit: number,
  skip: number,
  sortBy?: string,
  sortOrder?: string,
): Promise<PostResponse> => {
  const params = makeParams(limit, skip, sortBy, sortOrder)
  const response = await fetch(`${BASE_URL}/posts/search?q=${query}&${params}`)
  return response.json()
}

// 3. 태그별 조회
export const getPostsByTag = async (
  tag: string,
  limit: number,
  skip: number,
  sortBy?: string,
  sortOrder?: string,
): Promise<PostResponse> => {
  const params = makeParams(limit, skip, sortBy, sortOrder)
  // ✅ /api 대신 BASE_URL 사용
  const response = await fetch(`${BASE_URL}/posts/tag/${tag}?${params}`)
  return response.json()
}
// 4. 태그 목록 조회
export const getPostTags = async (): Promise<{ url: string; slug: string; name: string }[]> => {
  const response = await fetch(`${BASE_URL}/posts/tags`)
  return response.json()
}

// 5. 게시글 추가
export const addPostApi = async (newPost: { title: string; body: string; userId: number }) => {
  const response = await fetch(`${BASE_URL}/posts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  return response.json()
}

// 6. 게시글 수정 (🔥 좋아요/싫어요 버튼은 이 함수를 사용합니다!)
export const updatePostApi = async (post: any) => {
  const response = await fetch(`${BASE_URL}/posts/${post.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  })
  return response.json()
}

// 7. 게시글 삭제
export const deletePostApi = async (id: number) => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  })
  return response.json()
}
