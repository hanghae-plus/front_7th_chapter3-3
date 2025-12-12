import { useState, useCallback } from "react"
import { Post } from "@/entities/post/model/post"
import { User } from "@/entities/user/model/user"
import { fetchPosts } from "@/entities/post/api/fetch-posts"
import { fetchPostsByTag as fetchPostsByTagAPI } from "@/entities/post/api/fetch-posts-by-tag"
import { searchPosts as searchPostsAPI } from "@/entities/post/api/search-posts"

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)

  // Helper to join posts with users
  const joinPostsWithUsers = async (posts: Post[]) => {
    const usersResponse = await fetch("/api/users?limit=0&select=username,image")
    const usersData = await usersResponse.json()
    const users = usersData.users as User[]

    return posts.map((post) => ({
      ...post,
      author: users.find((user) => user.id === post.userId),
    }))
  }

  const refetchPosts = useCallback(async (options?: { skip: number; limit: number }) => {
    setLoading(true)
    try {
      const data = await fetchPosts(options)
      const postsWithUsers = await joinPostsWithUsers(data.posts)
      setPosts(postsWithUsers)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const searchPosts = useCallback(async (query: string) => {
    if (!query) return
    setLoading(true)
    try {
      const data = await searchPostsAPI(query)
      const postsWithUsers = await joinPostsWithUsers(data.posts)
      setPosts(postsWithUsers)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchPostsByTag = useCallback(async (tag: string) => {
    if (!tag || tag === "all") {
      return
    }
    setLoading(true)
    try {
      const data = await fetchPostsByTagAPI(tag)
      const postsWithUsers = await joinPostsWithUsers(data.posts)
      setPosts(postsWithUsers)
      setTotal(data.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    posts,
    total,
    loading,
    refetchPosts,
    searchPosts,
    fetchPostsByTag,
  }
}
