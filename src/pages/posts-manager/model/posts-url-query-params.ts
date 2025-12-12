import { PostsUrlQueryParams } from "./types";
import { DEFAULT_PAGINATION_SKIP, DEFAULT_PAGINATION_LIMIT } from "../../../shared/types";

export function parsePostsUrlQueryParams(searchParams: URLSearchParams): PostsUrlQueryParams {
  const skipRaw = searchParams.get("skip");
  const limitRaw = searchParams.get("limit");
  const sortByRaw = searchParams.get("sortBy");
  const sortOrderRaw = searchParams.get("sortOrder");
  const tagRaw = searchParams.get("tag");
  const searchRaw = searchParams.get("search");

  return {
    skip: skipRaw ? Number(skipRaw) : DEFAULT_PAGINATION_SKIP,
    limit: limitRaw ? Number(limitRaw) : DEFAULT_PAGINATION_LIMIT,
    sortBy: sortByRaw ?? null,
    sortOrder: sortOrderRaw === "asc" || sortOrderRaw === "desc" ? sortOrderRaw : null,
    tag: tagRaw ?? null,
    search: searchRaw ?? null,
  };
}

export function buildPostsUrlQueryParams(params: PostsUrlQueryParams): URLSearchParams {
  const searchParams = new URLSearchParams();

  if (params.skip !== null) searchParams.set("skip", params.skip.toString());
  if (params.limit !== null) searchParams.set("limit", params.limit.toString());
  if (params.sortBy !== null) searchParams.set("sortBy", params.sortBy);
  if (params.sortOrder !== null) searchParams.set("sortOrder", params.sortOrder);
  if (params.tag !== null) searchParams.set("tag", params.tag);
  if (params.search !== null) searchParams.set("search", params.search);

  return searchParams;
}
