import { useState } from "react"
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useSuspenseCommentList,
  useUpdateCommentMutation,
} from "../../../entities/comments/model"
import { Comment } from "../../../entities/comments/types"

export function useComments(postId: number) {
  const { data } = useSuspenseCommentList(postId)
  const comments = data.comments
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [showCommentAddModal, setShowCommentAddModal] = useState(false)
  const [showCommentEditModal, setShowCommentEditModal] = useState(false)

  const likeCommentMutation = useLikeCommentMutation(postId)
  const handleLike = async (id: number) => {
    try {
      await likeCommentMutation.mutateAsync({
        id,
        likes: (comments.find((comment: Comment) => comment.id === id)?.likes || 0) + 1,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenEditCommentModal = (comment: Comment) => {
    setSelectedComment(comment)
    setShowCommentEditModal(true)
  }

  const deleteCommentMutation = useDeleteCommentMutation(postId)
  const handleDelete = async (id: number) => {
    try {
      await deleteCommentMutation.mutateAsync(id)
    } catch (error) {
      console.error(error)
    }
  }

  const createCommentMutation = useCreateCommentMutation(postId, {
    onSuccess: () => {
      setShowCommentAddModal(false)
    },
  })
  const handleAddComment = async (body: string, postId: number, userId: number) => {
    try {
      await createCommentMutation.mutateAsync({ body, postId, userId })
    } catch (error) {
      console.error(error)
    }
  }

  const updateCommentMutation = useUpdateCommentMutation(postId, {
    onSuccess: () => {
      setShowCommentEditModal(false)
      setSelectedComment(null)
    },
  })
  const handleUpdateComment = async (id: number, body: string) => {
    try {
      await updateCommentMutation.mutateAsync({ id, body })
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenAddCommentModal = () => {
    setShowCommentAddModal(true)
  }

  return {
    comments,
    selectedComment,
    showCommentAddModal,
    showCommentEditModal,
    setShowCommentAddModal,
    setShowCommentEditModal,
    handleLike,
    handleOpenEditCommentModal,
    handleDelete,
    handleAddComment,
    handleUpdateComment,
    handleOpenAddCommentModal,
  }
}
