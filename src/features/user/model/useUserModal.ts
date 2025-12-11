import { useState } from 'react'

/**
 * 사용자 모달 기능
 * 사용자 모달의 상태 관리를 담당합니다.
 */
export const useUserModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return {
    isOpen,
    openModal,
    closeModal,
  }
}

