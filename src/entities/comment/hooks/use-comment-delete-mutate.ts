import { useMutation, useQueryClient } from "@tanstack/react-query";
import { commentKeys } from "../api/comment-keys";
import { deleteCommentApi } from "../api/comment-api";

interface UseCommentDeleteMutateProps {
  invalidateQueries?: boolean;
  onSuccess?: (data: void, variables: { postId: number; commentId: number }) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
  onSettled?: (data: void | undefined, error: Error | null) => void | Promise<void>;
}

export function useCommentDeleteMutate({
  invalidateQueries = true,
  onSuccess,
  onError,
  onSettled,
}: UseCommentDeleteMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { postId: number; commentId: number }) => deleteCommentApi(params.commentId),
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
