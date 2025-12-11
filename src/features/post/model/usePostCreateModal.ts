import { useState } from 'react'
import type { CreatePostDto } from '../../../entities/post'

/**
 * 게시물 생성 모달 기능
 * 게시물 생성 모달의 상태 및 폼 관리를 담당합니다.
 */
export const usePostCreateModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<CreatePostDto>({
    title: "",
    body: "",
    userId: 1,
  })

  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      body: "",
      userId: 1,
    })
  }

  const updateTitle = (title: string) => {
    setFormData((prev) => ({ ...prev, title }))
  }

  const updateBody = (body: string) => {
    setFormData((prev) => ({ ...prev, body }))
  }

  const updateUserId = (userId: number) => {
    setFormData((prev) => ({ ...prev, userId }))
  }

  return {
    isOpen,
    formData,
    openModal,
    closeModal,
    resetForm,
    updateTitle,
    updateBody,
    updateUserId,
  }
}

