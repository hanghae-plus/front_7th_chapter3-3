export interface GetCommentsResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

export interface Comment {
  id: number
  body: string
  postId: number
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
}

export interface AddCommentRequest {
  body: string
  postId: number
  userId: number
}
