import { Data } from "@/shared/api/types"

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

export interface CommentsData extends Data {
  comments: Comment[]
}

export interface NewComment extends Pick<Comment, "body"> {
  postId: number | null
  userId: number
}
