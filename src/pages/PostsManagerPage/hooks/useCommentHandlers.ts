import { useCommentMutations } from "@/entities/comment/model"

interface UseCommentHandlersProps {
  currentPostId: number | null
  setShowAddCommentDialog: (show: boolean) => void
  setShowEditCommentDialog: (show: boolean) => void
  loadComments: (postId: number) => void
  removeCommentFromState: (postId: number, commentId: number) => void
  likeCommentInState: (postId: number, commentId: number) => void
}

export const useCommentHandlers = ({
  currentPostId,
  setShowAddCommentDialog,
  setShowEditCommentDialog,
  loadComments,
  removeCommentFromState,
  likeCommentInState,
}: UseCommentHandlersProps) => {
  const { createComment, modifyComment, removeComment, likeCommentMutation } = useCommentMutations()

  const handleAddComment = (body: string) => {
    if (!currentPostId) return
    createComment(
      { body, postId: currentPostId, userId: 1 },
      {
        onSuccess: () => {
          setShowAddCommentDialog(false)
          loadComments(currentPostId)
        },
      },
    )
  }

  const handleUpdateComment = (id: number, body: string) => {
    if (!currentPostId) return
    modifyComment(id, body, {
      onSuccess: () => {
        setShowEditCommentDialog(false)
        loadComments(currentPostId)
      },
    })
  }

  const handleDeleteComment = (commentId: number) => {
    if (!currentPostId) return
    removeComment(commentId, {
      onSuccess: () => {
        removeCommentFromState(currentPostId, commentId)
      },
    })
  }

  const handleLikeComment = (commentId: number) => {
    if (!currentPostId) return
    likeCommentMutation(commentId, {
      onSuccess: () => {
        likeCommentInState(currentPostId, commentId)
      },
    })
  }

  return {
    handleAddComment,
    handleUpdateComment,
    handleDeleteComment,
    handleLikeComment,
  }
}
