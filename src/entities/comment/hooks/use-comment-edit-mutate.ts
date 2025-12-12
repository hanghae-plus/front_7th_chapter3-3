import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentModel } from "../model/types";
import { UpdateCommentDto } from "../api/dto";
import { commentKeys } from "../api/comment-keys";
import { updateCommentApi } from "../api/comment-api";

interface UseCommentEditMutateProps {
  invalidateQueries?: boolean;
  onSuccess?: (
    data: CommentModel,
    variables: { postId: number; commentId: number; commentDto: UpdateCommentDto },
  ) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
  onSettled?: (data: CommentModel | undefined, error: Error | null) => void | Promise<void>;
}

export function useCommentEditMutate({
  invalidateQueries = true,
  onSuccess,
  onError,
  onSettled,
}: UseCommentEditMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { postId: number; commentId: number; commentDto: UpdateCommentDto }) =>
      updateCommentApi(params.commentId, params.commentDto),
    onSuccess: async (data, variables) => {
      if (invalidateQueries) queryClient.invalidateQueries({ queryKey: commentKeys.list(variables.postId) });
      await onSuccess?.(data, variables);
    },
    onError: async (error) => {
      await onError?.(error);
    },
    onSettled: async (data, error) => {
      await onSettled?.(data, error);
    },
  });
}
