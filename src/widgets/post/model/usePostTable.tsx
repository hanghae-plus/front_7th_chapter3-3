import { useEditPostDialogStore } from "../../../features/post/model/useEditPostDialogStore"
import usePostParams from "../../../features/post/model/usePostParams"
import useDeletePostQuery from "../../../features/post/model/useDeletePostQuery"
import { useSelectedPostStore } from "../../../entities/post/model/useSelectedPostStore"
import { Post } from "../../../entities/post/model/post"
import useSelectedUserStore from "../../../entities/user/model/useSelectedUserStore"
import { useUserDialogStore } from "../../../features/user/model/useUserDialogStore"
import { useDetailPostDialogStore } from "./useDetailPostDialogStore"

const usePostTable = () => {
  const { updateParams, params } = usePostParams()

  const setSelectedPost = useSelectedPostStore((state) => state.setSelectedPost)
  const setShowEditDialog = useEditPostDialogStore((state) => state.setShowDialog)
  const setShowDetailDialog = useDetailPostDialogStore((state) => state.setShowDialog)
  const setSelectedUserId = useSelectedUserStore((state) => state.setSelectedUserId)
  const setShowUserDialog = useUserDialogStore((state) => state.setShowUserDialog)

  const { mutate: deletePost } = useDeletePostQuery()

  const openUserDialog = (userId: number) => {
    setSelectedUserId(userId)
    setShowUserDialog(true)
  }

  const openEditPostDialog = (post: Post) => {
    setSelectedPost(post)
    setShowEditDialog(true)
  }

  const searchTagPosts = (tag: string) => {
    updateParams({ selectedTag: tag })
  }

  const openDetailPostDialog = (post: Post) => {
    setSelectedPost(post)
    setShowDetailDialog(true)
  }

  return {
    openUserDialog,
    openDetailPostDialog,
    openEditPostDialog,
    deletePost,
    searchTagPosts,
    searchTag: params.selectedTag,
  }
}

export default usePostTable
