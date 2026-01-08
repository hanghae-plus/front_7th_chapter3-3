/**
 * User 엔티티 API 함수
 * 
 * 기본 조회 작업을 담당하는 API 함수들
 * @see mockdowns/RULES/api-response-structure.md - API 응답 구조 참고
 */

import type {
  UserResponse,
  UsersResponse,
  FetchUsersParams,
} from "../model/types"
import { getApiUrl } from "../../../shared/lib/api-config"

/**
 * 사용자 목록 조회
 */
export async function fetchUsers(params?: FetchUsersParams): Promise<UsersResponse> {
  try {
    const limit = params?.limit ?? 10
    const skip = params?.skip ?? 0
    const select = params?.select
    
    let url = getApiUrl(`/users?limit=${limit}&skip=${skip}`)
    if (select) {
      url += `&select=${select}`
    }
    
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`사용자 조회 실패: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error("사용자 조회 오류:", error)
    throw error
  }
}

/**
 * 사용자 상세 조회
 */
export async function fetchUserById(id: number): Promise<UserResponse> {
  try {
    const response = await fetch(getApiUrl(`/users/${id}`))
    
    if (!response.ok) {
      throw new Error(`사용자 조회 실패: ${response.statusText}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error("사용자 조회 오류:", error)
    throw error
  }
}

