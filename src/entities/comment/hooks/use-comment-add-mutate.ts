import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CommentModel } from "../model/types";
import { AddCommentDto } from "../api/dto";
import { commentKeys } from "../api/comment-keys";
import { addCommentApi } from "../api/comment-api";

interface UseCommentAddMutateProps {
  invalidateQueries?: boolean;
  onSuccess?: (data: CommentModel, variables: { postId: number; commentDto: AddCommentDto }) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
  onSettled?: (data: CommentModel | undefined, error: Error | null) => void | Promise<void>;
}

export function useCommentAddMutate({
  invalidateQueries = true,
  onSuccess,
  onError,
  onSettled,
}: UseCommentAddMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { postId: number; commentDto: AddCommentDto }) => addCommentApi(params.commentDto),
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
