import { Data } from "@/shared/api/types"
export interface Post {
  id: number
  title: string
  body: string
  userId: number
  tags: string[]
  views: number
  reactions: {
    likes: number
    dislikes: number
  }
}

export interface PostsData extends Data {
  posts: Post[]
}
export interface NewPost extends Pick<Post, "title" | "body" | "userId"> {
  tags?: string[]
}
