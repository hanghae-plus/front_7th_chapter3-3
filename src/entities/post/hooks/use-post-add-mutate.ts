import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostModel } from "../model/types";
import { addPostApi } from "../api/post-api";
import { AddPostDto } from "../api/dto";
import { postsKeys } from "../api/posts-keys";

interface UsePostAddMutateProps {
  invalidateQueries?: boolean;
  onSuccess?: (data: PostModel, variables: AddPostDto) => void | Promise<void>;
  onError?: (error: Error) => void | Promise<void>;
  onSettled?: (data: PostModel | undefined, error: Error | null) => void | Promise<void>;
}

export function usePostAddMutate({
  invalidateQueries = true,
  onSuccess,
  onError,
  onSettled,
}: UsePostAddMutateProps = {}) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AddPostDto) => addPostApi(params),
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
