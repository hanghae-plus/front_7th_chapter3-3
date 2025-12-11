import { createContext, ReactNode, useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import type { Post, NewPost } from "@/entities/post"
import { postsApi } from "@/entities/post"
import type { Tag } from "@/entities/tag"
import { tagsApi } from "@/entities/tag"
import type { Comment } from "@/entities/comment"
import { commentsApi } from "@/entities/comment"
import { fetchPostsWithAuthors } from "./fetch-posts-with-authors"

export interface PostContextValue {
  // State - 게시물
  posts: Post[]
  totalPosts: number
  selectedPost: Post | null
  loading: boolean

  // State - 필터 및 검색
  searchQuery: string
  selectedTag: string
  sortBy: string
  sortOrder: string
  skip: number
  limit: number

  // State - 태그
  tags: (Tag | string)[]

  // State - 댓글
  comments: Record<number, Comment[]>

  // Setters - 게시물
  setPosts: (posts: Post[]) => void
  setTotalPosts: (total: number) => void
  setSelectedPost: (post: Post | null) => void
  setLoading: (loading: boolean) => void

  // Setters - 필터 및 검색
  setSearchQuery: (query: string) => void
  setSelectedTag: (tag: string) => void
  setSortBy: (by: string) => void
  setSortOrder: (order: string) => void
  setSkip: (skip: number) => void
  setLimit: (limit: number) => void

  // Setters - 태그
  setTags: (tags: (Tag | string)[]) => void

  // Setters - 댓글
  setComments: (comments: Record<number, Comment[]>) => void

  // Actions - 목록 조회
  fetchPostsWithAuthorsList: () => Promise<void>

  // Actions - 검색
  searchPosts: (query: string) => Promise<void>

  // Actions - 필터
  filterPostsByTag: (tag: string) => Promise<void>

  // Actions - CRUD
  addPost: (newPost: NewPost) => Promise<Post | undefined>
  editPost: (id: number, updatedPost: Partial<Post>) => Promise<Post | undefined>
  deletePost: (id: number) => Promise<void>

  // Actions - 댓글
  fetchCommentsByPost: (postId: number) => Promise<void>
  addComment: (newComment: { body: string; postId: number; userId: number }) => Promise<Comment | undefined>
  editComment: (id: number, body: string) => Promise<Comment | undefined>
  deleteComment: (id: number, postId: number) => Promise<void>
  likeComment: (id: number, currentLikes: number) => Promise<Comment | undefined>

  // Actions - 태그
  fetchTags: () => Promise<void>

  // Actions - URL
  updateURL: () => void
}

export const PostContext = createContext<PostContextValue | null>(null)

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // State - 게시물
  const [posts, setPosts] = useState<Post[]>([])
  const [totalPosts, setTotalPosts] = useState<number>(0)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  // State - 필터 및 검색
  const [searchQuery, setSearchQuery] = useState<string>(queryParams.get("search") || "")
  const [selectedTag, setSelectedTag] = useState<string>(queryParams.get("tag") || "")
  const [sortBy, setSortBy] = useState<string>(queryParams.get("sortBy") || "")
  const [sortOrder, setSortOrder] = useState<string>(queryParams.get("sortOrder") || "asc")
  const [skip, setSkip] = useState<number>(parseInt(queryParams.get("skip") || "0"))
  const [limit, setLimit] = useState<number>(parseInt(queryParams.get("limit") || "10"))

  // State - 태그
  const [tags, setTags] = useState<(Tag | string)[]>([])

  // State - 댓글
  const [comments, setComments] = useState<Record<number, Comment[]>>({})

  // URL 업데이트
  const updateURL = useCallback(() => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }, [navigate, skip, limit, searchQuery, sortBy, sortOrder, selectedTag])

  // 게시물 가져오기
  const fetchPostsWithAuthorsList = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchPostsWithAuthors(limit, skip)
      setPosts(data.posts || [])
      setTotalPosts(data.total || 0)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }, [limit, skip])

  // 태그 가져오기
  const fetchTags = useCallback(async () => {
    try {
      const data = await tagsApi.getTags()
      // tags 또는 직접 배열 형식 모두 지원
      setTags(Array.isArray(data) ? data : data?.tags || [])
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }, [])

  // 게시물 검색
  const searchPosts = useCallback(async (query: string) => {
    if (!query.trim()) {
      return
    }
    setLoading(true)
    try {
      const data = await postsApi.searchPosts(query)
      setPosts(data.posts)
      setTotalPosts(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  // 태그별 게시물 가져오기
  const filterPostsByTag = useCallback(
    async (tag: string) => {
      if (!tag || tag === "all") {
        await fetchPostsWithAuthorsList()
        return
      }
      setLoading(true)
      try {
        const data = await tagsApi.getPostsByTag(tag)
        setPosts(data.posts)
        setTotalPosts(data.total)
      } catch (error) {
        console.error("태그별 게시물 가져오기 오류:", error)
      } finally {
        setLoading(false)
      }
    },
    [fetchPostsWithAuthorsList],
  )

  // 게시물 추가
  const addPost = useCallback(async (newPost: NewPost) => {
    try {
      const data = await postsApi.createPost(newPost)
      setPosts((prev) => [data, ...prev])
      setTotalPosts((prev) => prev + 1)
      return data
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  }, [])

  // 게시물 수정
  const editPost = useCallback(async (id: number, updatedPost: Partial<Post>) => {
    try {
      const data = await postsApi.updatePost(id, updatedPost)
      setPosts((prev) => prev.map((post) => (post.id === data.id ? data : post)))
      setSelectedPost(data)
      return data
    } catch (error) {
      console.error("게시물 수정 오류:", error)
    }
  }, [])

  // 게시물 삭제
  const deletePost = useCallback(async (id: number) => {
    try {
      await postsApi.deletePost(id)
      setPosts((prev) => prev.filter((post) => post.id !== id))
      setTotalPosts((prev) => prev - 1)
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  }, [])

  // 댓글 가져오기
  const fetchCommentsByPost = useCallback(
    async (postId: number) => {
      if (comments[postId]) return
      try {
        const data = await commentsApi.getCommentsByPost(postId)
        setComments((prev) => ({ ...prev, [postId]: data.comments }))
      } catch (error) {
        console.error("댓글 가져오기 오류:", error)
      }
    },
    [comments],
  )

  // 댓글 추가
  const addComment = useCallback(async (newComment: { body: string; postId: number; userId: number }) => {
    try {
      const data = await commentsApi.addComment(newComment)
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      return data
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }, [])

  // 댓글 수정
  const editComment = useCallback(async (id: number, body: string) => {
    try {
      const data = await commentsApi.updateComment(id, body)
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      return data
    } catch (error) {
      console.error("댓글 수정 오류:", error)
    }
  }, [])

  // 댓글 삭제
  const deleteComment = useCallback(async (id: number, postId: number) => {
    try {
      await commentsApi.deleteComment(id)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
    }
  }, [])

  // 댓글 좋아요
  const likeComment = useCallback(async (id: number, currentLikes: number) => {
    try {
      const data = await commentsApi.likeComment(id, currentLikes + 1)
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      return data
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }, [])

  // 초기 로드
  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  // URL 변경 감지
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSearchQuery(params.get("search") || "")
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  // 게시물 로드 및 필터 변경 감지 (검색 제외)
  useEffect(() => {
    const loadPosts = async () => {
      // 검색이 활성화되면 검색은 하지 않음 (명시적 호출만)
      if (searchQuery.trim()) {
        return
      }
      // 태그 필터가 활성화되면 태그별 게시물 가져오기
      if (selectedTag) {
        await filterPostsByTag(selectedTag)
      }
      // 기본: 전체 게시물 가져오기
      else {
        await fetchPostsWithAuthorsList()
      }
      updateURL()
    }
    loadPosts()
  }, [skip, limit, sortBy, sortOrder, selectedTag, fetchPostsWithAuthorsList, filterPostsByTag, updateURL, searchQuery])

  const value: PostContextValue = {
    // State
    posts,
    totalPosts,
    selectedPost,
    loading,
    searchQuery,
    selectedTag,
    sortBy,
    sortOrder,
    skip,
    limit,
    tags,
    comments,

    // Setters
    setPosts,
    setTotalPosts,
    setSelectedPost,
    setLoading,
    setSearchQuery,
    setSelectedTag,
    setSortBy,
    setSortOrder,
    setSkip,
    setLimit,
    setTags,
    setComments,

    // Actions
    fetchPostsWithAuthorsList,
    searchPosts,
    filterPostsByTag,
    addPost,
    editPost,
    deletePost,
    fetchCommentsByPost,
    addComment,
    editComment,
    deleteComment,
    likeComment,
    fetchTags,
    updateURL,
  }

  return <PostContext value={value}>{children}</PostContext>
}
