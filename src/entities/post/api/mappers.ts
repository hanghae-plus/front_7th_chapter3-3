import { PostsUrlQueryParams } from "../../../pages/posts-manager/model/types";
import { PostsListQueryParams, PostsSearchQueryParams, PostsTagQueryParams } from "./dto";

export const mapPostsUrlQueryParamsToApiParams = (params?: PostsUrlQueryParams): PostsListQueryParams => {
  const apiQueryParams: PostsListQueryParams = {};

  if (params?.limit) apiQueryParams.limit = params.limit.toString();
  if (params?.skip) apiQueryParams.skip = params.skip.toString();
  if (params?.sortBy) apiQueryParams.sortBy = params.sortBy;
  if (params?.sortOrder) apiQueryParams.sortOrder = params.sortOrder;

  return apiQueryParams;
};

export const mapPostsUrlQueryParamsToApiSearchParams = (params?: PostsUrlQueryParams): PostsSearchQueryParams => {
  const apiQueryParams: PostsSearchQueryParams = {};

  if (params?.search) apiQueryParams.q = params.search;
  if (params?.limit) apiQueryParams.limit = params.limit.toString();
  if (params?.skip) apiQueryParams.skip = params.skip.toString();

  return apiQueryParams;
};

export const mapPostsUrlQueryParamsToApiTagParams = (params?: PostsUrlQueryParams): PostsTagQueryParams => {
  const apiQueryParams: PostsTagQueryParams = {};

  if (params?.tag) apiQueryParams.tag = params.tag;
  if (params?.limit) apiQueryParams.limit = params.limit.toString();
  if (params?.skip) apiQueryParams.skip = params.skip.toString();

  return apiQueryParams;
};
