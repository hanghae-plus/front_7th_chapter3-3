import { PostsUrlQueryParams } from "../../../pages/posts-manager/model/types";
import { PostGetQueryParams } from "./dto";

export const mapPostsUrlQueryParamsToApiParams = (params?: PostsUrlQueryParams): PostGetQueryParams => {
  const apiQueryParams: PostGetQueryParams = {};

  if (params?.limit) apiQueryParams.limit = params.limit.toString();
  if (params?.skip) apiQueryParams.skip = params.skip.toString();
  if (params?.sortBy) apiQueryParams.sortBy = params.sortBy;
  if (params?.sortOrder) apiQueryParams.sortOrder = params.sortOrder;

  return apiQueryParams;
};
