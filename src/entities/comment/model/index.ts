/**
 * Comment 엔티티 타입 Export
 * 
 * @see mockdowns/RULES/index-export-rules.md - Export 규칙 참고
 */

// 기본 타입
export type { Comment } from "./types"

// API 응답 타입
export type { CommentResponse, CommentsResponse } from "./types"

// DTO 타입
export type { CreateCommentDto, UpdateCommentDto } from "./types"

// Store
export { useCommentStore } from "./store"
export type { CommentState } from "./store"

