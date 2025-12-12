import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostApi } from "../api/post-api";
import { postsKeys } from "../api/posts-keys";

interface UsePostDeleteMutateProps {
  invalidateQueries?: boolean;
  onSuccess?: (data: void, variables: { postId: number }) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
  onSettled?: (data: void | undefined, error: Error | null) => void | Promise<void>;
}

export function usePostDeleteMutate({
  invalidateQueries = true,
  onSuccess,
  onError,
  onSettled,
}: UsePostDeleteMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { postId: number }) => deletePostApi(params.postId),
    onSuccess: async (_, variables) => {
      if (invalidateQueries) queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
      await onSuccess?.(_, variables);
    },
    onError: async (error) => {
      await onError?.(error);
    },
    onSettled: async (_, error) => {
      await onSettled?.(_, error);
    },
  });
}
