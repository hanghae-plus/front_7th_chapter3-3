import { useState } from "react"
import { User, UserDetail } from "@/entities/user/model/user"
import { fetchUserDetail } from "@/entities/user/api/fetch-user-detail"

export const useUserHandlers = () => {
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)

  const openUserModal = async (user: User) => {
    try {
      const userData = await fetchUserDetail(user.id)
      setSelectedUser(userData)
      setShowUserModal(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return {
    showUserModal,
    setShowUserModal,
    selectedUser,
    openUserModal,
  }
}
