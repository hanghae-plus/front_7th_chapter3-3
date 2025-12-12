import { createContext, useContext } from "react";
import { PostsUrlQueryParams } from "../model/types";
import { usePostsUrlQueryModel } from "../hooks/use-posts-url-query-model";

interface PostsUrlQueryContextValue {
  queryParams: PostsUrlQueryParams;
  setQueryParams: (query: Partial<PostsUrlQueryParams>) => void;
}

const PostsUrlQueryContext = createContext<PostsUrlQueryContextValue | null>(null);

export function PostsUrlQueryProvider({ children }: { children: React.ReactNode }) {
  const { queryParams, setQueryParams } = usePostsUrlQueryModel();

  return <PostsUrlQueryContext value={{ queryParams, setQueryParams }}>{children}</PostsUrlQueryContext>;
}

export function usePostsUrlQuery() {
  const context = useContext(PostsUrlQueryContext);
  if (!context) {
    throw new Error("usePostsUrlQuery must be used within a PostsUrlQueryProvider");
  }
  return context;
}
