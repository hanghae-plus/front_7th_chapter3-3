/**
 * Post Edit Feature Hook
 *
 * 게시물 수정 기능을 위한 커스텀 훅
 */

import { usePostStore } from "../../../entities/post/model"
import { useUIStore } from "../../../shared/lib/stores"
import type { Post } from "../../../entities/post/model"

/**
 * 게시물 수정 훅
 */
export function usePostEdit() {
  const { selectedPost, setSelectedPost, updatePost } = usePostStore()
  const { setShowEditDialog, showEditDialog } = useUIStore()

  const handleUpdate = async () => {
    if (!selectedPost) return

    try {
      await updatePost(selectedPost.id, {
        title: selectedPost.title,
        body: selectedPost.body,
      })
      setShowEditDialog(false)
      setSelectedPost(null)
    } catch (error) {
      console.error("게시물 수정 오류:", error)
      throw error
    }
  }

  const openEditDialog = (post: Post) => {
    // 게시물 수정 Dialog를 열 때 다른 Dialog들을 닫기
    const { setShowPostDetailDialog } = useUIStore.getState()
    setShowPostDetailDialog(false)
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  return {
    selectedPost,
    setSelectedPost,
    showEditDialog,
    openEditDialog,
    handleUpdate,
  }
}
