import { useCallback } from "react"
import { useCommentsQuery } from "@/entities/comment/model/use-comments-query"
import { useQueryClient } from "@tanstack/react-query"
import { COMMENTS_QUERY_KEY } from "@/entities/comment/model/use-comments-query"
import { Comment } from "@/entities/comment/model/comment"

export const useComments = () => {
  const queryClient = useQueryClient()

  // 임시로 빈 Record 반환 (PostsManagerPage에서 currentPostId 기반으로 개별 조회)
  const comments: Record<number, Comment[]> = {}

  const loadComments = useCallback(
    async (postId: number) => {
      await queryClient.invalidateQueries({ queryKey: [...COMMENTS_QUERY_KEY, postId] })
    },
    [queryClient],
  )

  const addCommentToState = useCallback(
    (postId: number, comment: Comment) => {
      queryClient.setQueryData<Comment[]>([...COMMENTS_QUERY_KEY, postId], (old = []) => [comment, ...old])
    },
    [queryClient],
  )

  const updateCommentInState = useCallback(
    (_postId: number, commentId: number, updatedComment: Comment) => {
      queryClient.setQueryData<Comment[]>([...COMMENTS_QUERY_KEY, _postId], (old = []) =>
        old.map((comment) => (comment.id === commentId ? updatedComment : comment)),
      )
    },
    [queryClient],
  )

  const removeCommentFromState = useCallback(
    (postId: number, commentId: number) => {
      queryClient.setQueryData<Comment[]>([...COMMENTS_QUERY_KEY, postId], (old = []) =>
        old.filter((comment) => comment.id !== commentId),
      )
    },
    [queryClient],
  )

  const likeCommentInState = useCallback(
    (postId: number, commentId: number) => {
      queryClient.setQueryData<Comment[]>([...COMMENTS_QUERY_KEY, postId], (old = []) =>
        old.map((comment) =>
          comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment,
        ),
      )
    },
    [queryClient],
  )

  return {
    comments,
    loadComments,
    addCommentToState,
    updateCommentInState,
    removeCommentFromState,
    likeCommentInState,
  }
}

// 개별 포스트의 댓글을 가져오는 hook
export const usePostComments = (postId: number | null) => {
  const { data: comments = [] } = useCommentsQuery(postId)
  return comments
}
