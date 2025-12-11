import { User } from "@/entities/user/model/types"

// 게시글 데이터 구조
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

  // 클라이언트에서 Join하는 데이터 (Optional)
  author?: User
}

// API 응답 구조
export interface PostResponse {
  posts: Post[]
  total: number
  skip: number
  limit: number
}
