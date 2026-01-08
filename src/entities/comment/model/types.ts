/**
 * Comment 엔티티 타입 정의
 * 
 * @see mockdowns/RULES/api-response-structure.md - API 응답 구조 참고
 */

// 댓글 정보
export interface Comment {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  dislikes: number
}

// API 응답 타입
export interface CommentResponse {
  id: number
  body: string
  postId: number
  userId: number
  likes: number
  dislikes: number
}

export interface CommentsResponse {
  comments: Comment[]
  total: number
  skip: number
  limit: number
}

// DTO 타입
export interface CreateCommentDto {
  body: string
  postId: number
  userId: number
}

export interface UpdateCommentDto {
  body: string
}

