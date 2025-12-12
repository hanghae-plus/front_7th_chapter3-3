export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
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
