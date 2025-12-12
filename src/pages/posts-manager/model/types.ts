export type PostsUrlQueryParams = {
  skip: number | null;
  limit: number | null;
  sortBy: string | null;
  sortOrder: "asc" | "desc" | null;
  tag: string | null;
  search: string | null;
};
