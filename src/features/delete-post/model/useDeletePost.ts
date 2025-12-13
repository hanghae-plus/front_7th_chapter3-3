import { usePostStore } from "../../../entities/post/model/usePostStore"

export const useDeletePost = () => {
  const deletePostFromStore = usePostStore((state) => state.deletePost)

  const deletePost = async (id: number) => {
    await deletePostFromStore(id)
  }

  return {
    deletePost,
  }
}

