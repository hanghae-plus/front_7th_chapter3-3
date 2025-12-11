import { useState } from 'react'
import type { Post, UpdatePostDto } from '../../../entities/post'

/**
 * 게시물 수정 모달 기능
 * 게시물 수정 모달의 상태 및 폼 관리를 담당합니다.
 */
export const usePostEditModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [formData, setFormData] = useState<UpdatePostDto>({
    title: "",
    body: "",
  })

  const openModal = (post: Post) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      body: post.body,
    })
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setEditingPost(null)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      body: "",
    })
  }

  const updateTitle = (title: string) => {
    setFormData((prev) => ({ ...prev, title }))
  }

  const updateBody = (body: string) => {
    setFormData((prev) => ({ ...prev, body }))
  }

  return {
    isOpen,
    editingPost,
    formData,
    openModal,
    closeModal,
    resetForm,
    updateTitle,
    updateBody,
  }
}

