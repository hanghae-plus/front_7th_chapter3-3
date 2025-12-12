import { useSearchParams } from "react-router-dom";
import { buildPostsUrlQueryParams, parsePostsUrlQueryParams } from "./posts-url-query-params";
import { useMemo } from "react";
import { PostsUrlQueryParams } from "./types";

export function usePostsUrlQueryModel() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = useMemo(() => parsePostsUrlQueryParams(searchParams), [searchParams]);

  const setQueryParams = (query: Partial<PostsUrlQueryParams>) => {
    const next = { ...queryParams, ...query };
    const newSearchParams = buildPostsUrlQueryParams(next);
    setSearchParams(newSearchParams, { replace: true });
  };

  return { queryParams, setQueryParams };
}
