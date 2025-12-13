import { useState } from "react"
import { usePostStore } from "../../../entities/post/model/usePostStore"
import { Post } from "../../../entities/post/model/types"

export const useEditPost = () => {
  const updatePostInStore = usePostStore((state) => state.updatePost)
  const [showDialog, setShowDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const openDialog = (post: Post) => {
    setSelectedPost(post)
    setShowDialog(true)
  }

  const closeDialog = () => {
    setShowDialog(false)
    setSelectedPost(null)
  }

  const updatePost = async () => {
    if (!selectedPost) return
    const data = await updatePostInStore(selectedPost)
    if (data) {
      closeDialog()
    }
    return data
  }

  return {
    // 상태
    showDialog,
    selectedPost,
    // 액션
    setShowDialog,
    setSelectedPost,
    openDialog,
    closeDialog,
    updatePost,
  }
}

