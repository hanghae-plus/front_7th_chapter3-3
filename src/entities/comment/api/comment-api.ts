/**
 * Comment 엔티티 API 함수
 * 
 * 기본 CRUD 작업을 담당하는 API 함수들
 * @see mockdowns/RULES/api-response-structure.md - API 응답 구조 참고
 */

import type {
  CommentResponse,
  CommentsResponse,
  CreateCommentDto,
  UpdateCommentDto,
} from "../model/types"
import { getApiUrl } from "../../../shared/lib/api-config"

/**
 * 댓글 목록 조회 (게시물별)
 */
export async function fetchComments(postId: number): Promise<CommentsResponse> {
  try {
    const response = await fetch(getApiUrl(`/comments/post/${postId}`))
    
    if (!response.ok) {
      throw new Error(`댓글 조회 실패: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error("댓글 조회 오류:", error)
    throw error
  }
}

/**
 * 댓글 추가
 */
export async function addComment(comment: CreateCommentDto): Promise<CommentResponse> {
  try {
    const response = await fetch(getApiUrl("/comments/add"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
    
    if (!response.ok) {
      throw new Error(`댓글 추가 실패: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error("댓글 추가 오류:", error)
    throw error
  }
}

/**
 * 댓글 수정
 */
export async function updateComment(id: number, comment: UpdateCommentDto): Promise<CommentResponse> {
  try {
    const response = await fetch(getApiUrl(`/comments/${id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
    
    if (!response.ok) {
      throw new Error(`댓글 수정 실패: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error("댓글 수정 오류:", error)
    throw error
  }
}

/**
 * 댓글 삭제
 */
export async function deleteComment(id: number): Promise<void> {
  try {
    const response = await fetch(getApiUrl(`/comments/${id}`), {
      method: "DELETE",
    })
    
    if (!response.ok) {
      throw new Error(`댓글 삭제 실패: ${response.statusText}`)
    }
  } catch (error) {
    console.error("댓글 삭제 오류:", error)
    throw error
  }
}

