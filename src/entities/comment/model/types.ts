export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
    fullName?: string
  }
}

export interface CommentResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}
