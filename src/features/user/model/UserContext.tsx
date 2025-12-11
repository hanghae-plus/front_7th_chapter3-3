import { createContext, ReactNode, useCallback, useState } from "react"
import type { User } from "@/entities/user"
import { usersApi } from "@/entities/user"

export interface UserContextValue {
  // State
  selectedUser: User | null
  isOpen: boolean

  // Setters
  setSelectedUser: (user: User | null) => void
  setIsOpen: (open: boolean) => void

  // Actions
  fetchUserDetail: (userId: number) => Promise<void>
  openUserDetailModal: (userId: number) => Promise<void>
  closeUserDetailModal: () => void
}

export const UserContext = createContext<UserContextValue | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const fetchUserDetail = useCallback(async (userId: number) => {
    try {
      const userData = await usersApi.getUser(userId)
      setSelectedUser(userData)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }, [])

  const openUserDetailModal = useCallback(
    async (userId: number) => {
      await fetchUserDetail(userId)
      setIsOpen(true)
    },
    [fetchUserDetail],
  )

  const closeUserDetailModal = useCallback(() => {
    setIsOpen(false)
    setSelectedUser(null)
  }, [])

  const value: UserContextValue = {
    // State
    selectedUser,
    isOpen,

    // Setters
    setSelectedUser,
    setIsOpen,

    // Actions
    fetchUserDetail,
    openUserDetailModal,
    closeUserDetailModal,
  }

  return <UserContext value={value}>{children}</UserContext>
}
