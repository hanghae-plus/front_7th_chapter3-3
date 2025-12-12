import { PostsUrlQueryParams } from "./types";

export function parsePostsUrlQueryParams(searchParams: URLSearchParams): PostsUrlQueryParams {
  const skipRaw = searchParams.get("skip");
  const limitRaw = searchParams.get("limit");
  const sortByRaw = searchParams.get("sortBy");
  const sortOrderRaw = searchParams.get("sortOrder");
  const tagRaw = searchParams.get("tag");
  const searchRaw = searchParams.get("search");

  const skip = skipRaw ? parseInt(skipRaw) : undefined;
  const limit = limitRaw ? parseInt(limitRaw) : undefined;
  const sortBy = sortByRaw ? sortByRaw : undefined;
  const sortOrder = sortOrderRaw === "asc" ? "asc" : sortOrderRaw === "desc" ? "desc" : undefined;
  const tag = tagRaw ? tagRaw : undefined;
  const search = searchRaw ? searchRaw : undefined;

  return {
    skip,
    limit,
    sortBy,
    sortOrder,
    tag,
    search,
  };
}

export function buildPostsUrlQueryParams(params: PostsUrlQueryParams): URLSearchParams {
  const searchParams = new URLSearchParams();
  if (params.skip) searchParams.set("skip", params.skip.toString());
  if (params.limit) searchParams.set("limit", params.limit.toString());
  if (params.sortBy) searchParams.set("sortBy", params.sortBy);
  if (params.sortOrder) searchParams.set("sortOrder", params.sortOrder);
  if (params.tag) searchParams.set("tag", params.tag);
  if (params.search) searchParams.set("search", params.search);
  return searchParams;
}
