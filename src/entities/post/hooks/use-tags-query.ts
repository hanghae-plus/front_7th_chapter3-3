import { useQuery } from "@tanstack/react-query";
import { postsKeys } from "../api/posts-keys";
import { getPostTagsApi } from "../api/post-api";

interface UseTagsQueryProps {
  enabled?: boolean;
}

export function useTagsQuery({ enabled = true }: UseTagsQueryProps = {}) {
  return useQuery({
    queryKey: postsKeys.tags(),
    queryFn: () => getPostTagsApi(),
    enabled,
  });
}
