import { BaseListApiResponse } from "../../../shared/api/types";
import { PostModel } from "../model/types";

export type AddPostDto = Pick<PostModel, "title" | "body" | "userId">;

export type UpdatePostDto = Pick<PostModel, "title" | "body" | "userId">;

export type PostsBaseQueryParams = {
  limit?: string;
  skip?: string;
};

export type PostsListQueryParams = {
  sortBy?: string;
  sortOrder?: "asc" | "desc";
} & PostsBaseQueryParams;

export type PostsSearchQueryParams = {
  q?: string;
} & PostsBaseQueryParams;

export type PostsTagQueryParams = {
  tag?: string;
} & PostsBaseQueryParams;

export type PostListApiResponse = BaseListApiResponse & {
  posts: PostModel[];
};
