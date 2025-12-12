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
  views: number
}

export interface PostWithAuthor extends Post {
  author?: {
    id: number
    username: string
    image: string
  }
}

export interface PostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface CreatePostRequest {
  title: string
  body: string
  userId: number
}

export interface UpdatePostRequest {
  title?: string
  body?: string
}
