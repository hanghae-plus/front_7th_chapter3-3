export interface GetPostsResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}

export interface Post {
  id: number
  title: string
  body: string
  tags: string[]
  reactions: {
    likes: number
    dislikes: number
  }
  views: number
  userId: number
  author?: {
    id: number
    username: string
    image: string
  }
}

export interface AddPostRequest {
  title: string
  body: string
  userId: number
}

export interface PostParams {
  skip: number
  limit: number
  searchQuery: string
  sortBy: string
  sortOrder: string
  selectedTag: string
}
