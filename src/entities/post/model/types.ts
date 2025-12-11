// Post의 author는 User 엔티티를 참조하지만,
// FSD 규칙상 같은 Layer 내 다른 Slice를 직접 import할 수 없으므로
// 필요한 필드만 별도로 정의합니다.
export interface PostAuthor {
  id: number
  username: string
  image: string
}

export interface Post {
  id: number
  title: string
  body: string
  tags?: string[]
  reactions?: {
    likes: number
    dislikes: number
  }
  views?: number
  userId: number
  author?: PostAuthor
}
