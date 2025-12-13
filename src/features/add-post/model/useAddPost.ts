import { useState } from "react"
import { usePostStore } from "../../../entities/post/model/usePostStore"
import { NewPost } from "../../../entities/post/model/types"

export const useAddPost = () => {
  const addPostToStore = usePostStore((state) => state.addPost)
  const [showDialog, setShowDialog] = useState(false)
  const [newPost, setNewPost] = useState<NewPost>({ title: "", body: "", userId: 1 })

  const openDialog = () => setShowDialog(true)
  const closeDialog = () => setShowDialog(false)

  const resetForm = () => {
    setNewPost({ title: "", body: "", userId: 1 })
  }

  const addPost = async () => {
    const data = await addPostToStore(newPost)
    if (data) {
      closeDialog()
      resetForm()
    }
    return data
  }

  return {
    // 상태
    showDialog,
    newPost,
    // 액션
    setShowDialog,
    setNewPost,
    openDialog,
    closeDialog,
    addPost,
  }
}
