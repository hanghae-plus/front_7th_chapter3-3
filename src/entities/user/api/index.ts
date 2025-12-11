import { User, UserResponse } from "../model/types"

const isDev = import.meta.env.DEV
const BASE_URL = isDev ? "/api" : "https://dummyjson.com"

// 1. 유저 목록 (기존)
export const getUsers = async (): Promise<UserResponse> => {
  const response = await fetch(`${BASE_URL}/users?limit=0&select=username,image`)
  return response.json()
}

// 2. 유저 상세 (기존 - useEffect에서 사용할 것)
export const getUserDetail = async (userId: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`)
  return response.json()
}

//  유저 정보 수정
export const updateUser = async (userId: number, updatedData: Partial<User>): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  })
  return response.json()
}
