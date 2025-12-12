export interface Comment {
  id: number
  postId: number
  body: string
  likes: number
  user: {
    id: number
    username: string
    fullName: string
  }
}

export interface CommentsResponse {
  comments: Comment[]
  limit: number
  skip: number
  total: number
}

export interface CommentRequestBody extends Record<string, unknown> {
  postId: number
  userId: number
  body: string
}

export type CommentResponse = Omit<Comment, "likes">

export interface UpdateCommentRequestBody extends Record<string, unknown> {
  body: string
}
