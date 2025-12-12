export type TComment = {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  user?: {
    id: number
    username: string
    image: string
  }
}
