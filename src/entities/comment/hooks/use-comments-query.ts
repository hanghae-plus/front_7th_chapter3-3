import { commentKeys } from "../api/comment-keys";
import { useQuery } from "@tanstack/react-query";
import { getCommentsApi } from "../api/comment-api";

interface UseCommentsQueryProps {
  postId: number;
  enabled?: boolean;
}

export function useCommentsQuery({ postId, enabled = true }: UseCommentsQueryProps) {
  return useQuery({
    queryKey: commentKeys.list(postId),
    queryFn: () => getCommentsApi(postId),
    enabled,
  });
}
