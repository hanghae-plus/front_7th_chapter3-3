import { PaginationParams } from "../../../shared/types";
import { PostFilterParams } from "../../../features/post-filter";
import { PostsListQueryParams, PostsSearchQueryParams, PostsTagQueryParams } from "../../../entities/post";

interface MapperParams {
  pagination: PaginationParams;
  filter: PostFilterParams;
}

export const mapToPostsApiParams = ({ pagination, filter }: MapperParams): PostsListQueryParams => {
  const apiQueryParams: PostsListQueryParams = {};

  if (pagination.limit) apiQueryParams.limit = pagination.limit.toString();
  if (pagination.skip) apiQueryParams.skip = pagination.skip.toString();
  if (filter.sortBy) apiQueryParams.sortBy = filter.sortBy;
  if (filter.sortOrder) apiQueryParams.sortOrder = filter.sortOrder;

  return apiQueryParams;
};

export const mapToPostsSearchApiParams = ({ pagination, filter }: MapperParams): PostsSearchQueryParams => {
  const apiQueryParams: PostsSearchQueryParams = {};

  if (filter.search) apiQueryParams.q = filter.search;
  if (pagination.limit) apiQueryParams.limit = pagination.limit.toString();
  if (pagination.skip) apiQueryParams.skip = pagination.skip.toString();

  return apiQueryParams;
};

export const mapToPostsTagApiParams = ({ pagination }: Pick<MapperParams, "pagination">): PostsTagQueryParams => {
  const apiQueryParams: PostsTagQueryParams = {};

  if (pagination.limit) apiQueryParams.limit = pagination.limit.toString();
  if (pagination.skip) apiQueryParams.skip = pagination.skip.toString();

  return apiQueryParams;
};
