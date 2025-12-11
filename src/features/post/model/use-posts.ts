import { useState, useCallback } from "react"
import { Post } from "@/entities/post/model/post"
import { User } from "@/entities/user/model/user"
import { fetchPosts } from "@/entities/post/api/fetch-posts"
import { fetchPostsByTag } from "@/entities/post/api/fetch-posts-by-tag"

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
      const data = await searchPosts(query)
      // Search API often returns posts directly, but we might need to join users if API doesn't return them
      // Assuming search API returns same structure or we handle it.
      // If search result structure is different, we might need adjustment.
      // Based on original code:
      /*
        const response = await fetch(`/api/posts/search?q=${searchQuery}`)
        const data = await response.json()
        setPosts(data.posts)
      */
      // It seems search results didn't join users in original code?
      // Checking original code...
      // Original:
      /*
        const response = await fetch(`/api/posts/search?q=${searchQuery}`)
        const data = await response.json()
        setPosts(data.posts)
        setTotal(data.total)
      */
      // It seems original search didn't join users explicitly? Or maybe it's not needed for search view?
      // Wait, PostTable needs author. If search doesn't provide author, table crashes or shows empty.
      // I should probably join users for search too to be safe and consistent.

      // Let's assume we need to join users.
      // But wait, the original code for searchPosts didn't call fetch users.
      // Maybe search API returns augmented data? Unlikely for dummyjson.
      // I will add user joining for consistency.
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
      // If tag is 'all', we shouldn't really call this, but just in case
      return
    }
    setLoading(true)
    try {
      const data = await fetchPostsByTag(tag)
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
