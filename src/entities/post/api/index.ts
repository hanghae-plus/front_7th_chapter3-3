import type { PostWithAuthor } from "@/entities/post/@x/with-user"
import type { PostsData, NewPost } from "../model/types"
import { fetchUsers } from "@/entities/user/api"
import { API_BASE_URL } from "@/shared/api/config"

export interface PostsWithAuthorsData {
  posts: PostWithAuthor[]
  total: number
  skip: number
  limit: number
}

// 게시물 추가
export const addPost = async (newPost: NewPost) => {
  const response = await fetch(`${API_BASE_URL}/posts/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPost),
  })
  if (!response.ok) {
    throw new Error("게시물 추가 오류: " + response.statusText)
  }
  // DummyJSON /posts/add는 단일 Post 객체를 반환
  return await response.json()
}

// 게시물 가져오기 (users 데이터와 병합)
export const fetchPosts = async (limit: number, skip: number): Promise<PostsWithAuthorsData> => {
  const [postsResponse, usersData] = await Promise.all([
    fetch(`${API_BASE_URL}/posts?limit=${limit}&skip=${skip}`),
    fetchUsers(),
  ])

  if (!postsResponse.ok) {
    throw new Error("게시물 가져오기 오류: " + postsResponse.statusText)
  }

  const postsData = (await postsResponse.json()) as PostsData
  const postsWithUsers = postsData.posts.map((post) => ({
    ...post,
    author: usersData.users.find((user) => user.id === post.userId),
  }))

  return {
    posts: postsWithUsers,
    total: postsData.total,
    skip: postsData.skip,
    limit: postsData.limit,
  }
}

// export const handleFetchPosts = async () => {
//   setLoading(true)
//   try {
//     const postsData = await fetchPosts()
//     const usersData = await fetchUsers()

//     const postsWithUsers = postsData.posts.map((post) => ({
//       ...post,
//       author: usersData.users.find((user) => user.id === post.userId),
//     }))

//     setPosts(postsWithUsers)
//     setTotal(postsData.total)
//   } catch (error) {
//     console.error("게시물 가져오기 오류:", error)
//   } finally {
//     setLoading(false)
//   }
// }

// 게시물 업데이트
export const updatePost = async (selectedPost: PostWithAuthor) => {
  const response = await fetch(`${API_BASE_URL}/posts/${selectedPost.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  })
  if (!response.ok) {
    throw new Error("게시물 업데이트 오류: " + response.statusText)
  }
  return (await response.json()) as PostWithAuthor
}

// export const handleUpdatePost = async (selectedPost: PostWithAuthor) => {
//   try {
//     setPosts((posts) => posts.map((post) => (post.id === data.id ? data : post)))
//     setShowEditDialog(false)
//   } catch (error) {
//     console.error("게시물 업데이트 오류:", error)
//   }
// }

// 게시물 삭제
export const deletePost = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
    method: "DELETE",
  })
  if (!response.ok) {
    throw new Error("게시물 삭제 오류: " + response.statusText)
  }
  return await response.json() // 정확한 반환값 아직 모름.
}

// 게시물 검색 (users 데이터와 병합)
export const searchPosts = async (searchQuery: string): Promise<PostsWithAuthorsData> => {
  const [searchResponse, usersData] = await Promise.all([
    fetch(`${API_BASE_URL}/posts/search?q=${searchQuery}`),
    fetchUsers(),
  ])

  if (!searchResponse.ok) {
    throw new Error("게시물 검색 오류: " + searchResponse.statusText)
  }

  const postsData = (await searchResponse.json()) as PostsData
  const postsWithUsers = postsData.posts.map((post) => ({
    ...post,
    author: usersData.users.find((user) => user.id === post.userId),
  }))

  return {
    posts: postsWithUsers,
    total: postsData.total,
    skip: postsData.skip,
    limit: postsData.limit,
  }
}

// 태그별 게시물 가져오기 (users 데이터와 병합)
export const fetchPostsByTag = async (tag: string): Promise<PostsWithAuthorsData> => {
  const [postsResponse, usersData] = await Promise.all([
    fetch(`${API_BASE_URL}/posts/tag/${tag}`),
    fetchUsers(),
  ])

  if (!postsResponse.ok) {
    throw new Error("태그별 게시물 가져오기 오류: " + postsResponse.statusText)
  }

  const postsData = (await postsResponse.json()) as PostsData
  const postsWithUsers = postsData.posts.map((post) => ({
    ...post,
    author: usersData.users.find((user) => user.id === post.userId),
  }))

  return {
    posts: postsWithUsers,
    total: postsData.total,
    skip: postsData.skip,
    limit: postsData.limit,
  }
}

// 아무리 봐도 피쳐인거 같은데.
// 태그별 게시물 가져오기
// export const fetchPostsByTag = async (tag: string | undefined) => {
//   if (!tag || tag === "all") {
//     fetchPosts()
//     return
//   }
//   setLoading(true)
//   try {
//     const [postsResponse, usersResponse] = await Promise.all([
//       fetch(`${API_BASE_URL}/posts/tag/${tag}`),
//       fetch("/api/users?limit=0&select=username,image"),
//     ])
//     const postsData = (await postsResponse.json()) as PostsData
//     const usersData = (await usersResponse.json()) as UsersData

//     const postsWithUsers = postsData.posts.map((post) => ({
//       ...post,
//       author: usersData.users.find((user) => user.id === post.userId),
//     }))

//     setPosts(postsWithUsers)
//     setTotal(postsData.total)
//   } catch (error) {
//     console.error("태그별 게시물 가져오기 오류:", error)
//   }
//   setLoading(false)
// }

// export const handleFetchPostsByTag = async (tag: string | undefined) => {
//   try {
//     const data = await fetchPostsByTag(tag)
//     setPosts(data.posts)
//     setTotal(data.total)
//   } catch (error) {
//     console.error("태그별 게시물 가져오기 오류:", error)
//   }
// }
