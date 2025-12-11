import { useState, useEffect } from "react"
import { User } from "../model/types"
import { getUserDetail, updateUser } from "../api"

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // 1. 내 정보 가져오기 (useEffect + API 함수)
  useEffect(() => {
    getUserDetail(1)
      .then((data) => setUser(data))
      .catch((err) => console.error("Failed to fetch user:", err))
      .finally(() => setLoading(false))
  }, [])

  // 2. 내 정보 수정하기 (API 함수 사용)
  const updateProfile = async (updatedData: Partial<User>) => {
    if (!user) return

    try {
      const data = await updateUser(user.id, updatedData)

      // 상태 업데이트 (화면 즉시 반영)
      setUser((prev) => (prev ? { ...prev, ...data } : data))
      alert("정보가 성공적으로 수정되었습니다!")
    } catch (error) {
      console.error("Failed to update profile:", error)
      alert("수정 중 오류가 발생했습니다.")
    }
  }

  return { user, loading, updateProfile }
}
