import { useState } from 'react'
import type { Post } from '../../../entities/post'

/**
 * 게시물 상세 모달 기능
 * 게시물 상세 모달의 상태 관리를 담당합니다.
 */
export const usePostDetailModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const openModal = (post: Post) => {
    setSelectedPost(post)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedPost(null)
  }

  return {
    isOpen,
    selectedPost,
    openModal,
    closeModal,
    setSelectedPost,
  }
}

