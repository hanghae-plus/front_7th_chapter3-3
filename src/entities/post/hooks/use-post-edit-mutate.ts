import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostModel } from "../model/types";
import { updatePostApi } from "../api/post-api";
import { postsKeys } from "../api/posts-keys";
import { UpdatePostDto } from "../api/dto";

interface UsePostEditMutateProps {
  invalidateQueries?: boolean;
  onSuccess?: (data: PostModel, variables: UpdatePostDto & { postId: number }) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
  onSettled?: (data: PostModel | undefined, error: Error | null) => void | Promise<void>;
}

export function usePostEditMutate({ invalidateQueries = true, onSuccess, onError, onSettled }: UsePostEditMutateProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, ...params }: UpdatePostDto & { postId: number }) => updatePostApi(postId, params),
    onSuccess: async (data, variables) => {
      if (invalidateQueries) queryClient.invalidateQueries({ queryKey: postsKeys.lists() });
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
