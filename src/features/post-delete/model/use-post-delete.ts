/**
 * Post Delete Feature Hook
 *
 * 게시물 삭제 기능을 위한 커스텀 훅
 */

import { usePostStore } from "../../../entities/post/model"

/**
 * 게시물 삭제 훅
 */
export function usePostDelete() {
  const { deletePost } = usePostStore()

  const handleDeletePost = async (id: number) => {
    try {
      await deletePost(id)
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
      throw error
    }
  }

  return {
    handleDeletePost,
  }
}
