/**
 * User View Feature Hook
 *
 * 사용자 정보 조회 기능을 위한 커스텀 훅
 */

import { useUserStore } from "../../../entities/user/model"
import { useUIStore } from "../../../shared/lib/stores"

/**
 * 사용자 정보 조회 훅
 */
export function useUserView() {
  const { fetchUserById, selectedUser, setSelectedUser } = useUserStore()
  const { setShowUserModal } = useUIStore()

  const handleViewUser = async (userId: number) => {
    try {
      await fetchUserById(userId)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 조회 오류:", error)
      throw error
    }
  }

  return {
    selectedUser,
    setSelectedUser,
    handleViewUser,
  }
}
