/**
 * Post Create Feature Hook
 *
 * 게시물 생성 기능을 위한 커스텀 훅
 */

import { usePostStore } from "../../../entities/post/model"
import { useUIStore } from "../../../shared/lib/stores"

/**
 * 게시물 생성 훅
 */
export function usePostCreate() {
  const { addPost, setNewPost, newPost } = usePostStore()
  const { setShowAddDialog, showAddDialog } = useUIStore()

  const handleCreate = async (post: { title: string; body: string; userId: number }) => {
    try {
      await addPost(post)
      setShowAddDialog(false)
      setNewPost({ title: "", body: "", userId: 1 })
    } catch (error) {
      console.error("게시물 생성 오류:", error)
      throw error
    }
  }

  const openAddDialog = () => {
    setNewPost({ title: "", body: "", userId: 1 })
    setShowAddDialog(true)
  }

  return {
    newPost,
    setNewPost,
    showAddDialog,
    openAddDialog,
    handleCreate,
  }
}
