import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentKeys } from "../api/comment-keys";
import { likeCommentApi } from "../api/comment-api";
import { CommentModel } from "../model/types";

interface UseCommentLikeMutateProps {
  invalidateQueries?: boolean;
  onSuccess?: (data: CommentModel, variables: { postId: number; commentId: number }) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
  onSettled?: (data: CommentModel | undefined, error: Error | null) => void | Promise<void>;
}

export function useCommentLikeMutate({
  invalidateQueries = true,
  onSuccess,
  onError,
  onSettled,
}: UseCommentLikeMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { postId: number; commentId: number }) => likeCommentApi(params.commentId, params.likes),
    onSuccess: async (_, variables) => {
      if (invalidateQueries) queryClient.invalidateQueries({ queryKey: commentKeys.list(variables.postId) });
      await onSuccess?.(_, variables);
    },
    onError: async (error) => {
      await onError?.(error);
    },
    onSettled: async (data, error) => {
      await onSettled?.(data, error);
    },
  });
}
