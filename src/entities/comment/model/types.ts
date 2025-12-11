export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  user?: {
    username: string
    image: string
  }
}

export interface CommentsResponse {
  comments: Comment[]
}

export interface NewComment {
  body: string
  postId: number
  userId: number
}

