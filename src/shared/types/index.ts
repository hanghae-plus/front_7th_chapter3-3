// User types
export interface User {
  id: number
  username: string
  image: string
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  address: {
    address: string
    city: string
    state: string
  }
  company: {
    name: string
    title: string
  }
}

export interface UserPreview {
  id: number
  username: string
  image: string
}

// Post types
export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  author?: UserPreview
}

export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface CreatePostDto {
  title: string
  body: string
  userId: number
}

export interface UpdatePostDto {
  title?: string
  body?: string
}

// Comment types
export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
  }
}

export interface CommentsResponse {
  comments: Comment[]
  total: number
}

export interface CreateCommentDto {
  body: string
  postId: number
  userId: number
}

export interface UpdateCommentDto {
  body: string
}

// Tag types
export interface Tag {
  slug: string
  name: string
  url: string
}

// Pagination types
export interface PaginationParams {
  limit: number
  skip: number
}

// Search types
export interface SearchParams {
  query: string
}

// Sort types
export interface SortParams {
  sortBy: string
  sortOrder: "asc" | "desc"
}
