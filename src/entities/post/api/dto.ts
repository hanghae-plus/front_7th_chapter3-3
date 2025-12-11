import { BaseListApiResponse } from "../../../shared/api/types";
import { PostModel } from "../model/types";

export type AddPostDto = Pick<PostModel, "title" | "body" | "userId">;

export type UpdatePostDto = Pick<PostModel, "title" | "body" | "userId">;

export type PostGetQueryParams = {
  limit?: string;
  skip?: string;
  sortBy?: string;
  sortOrder?: string;
};

export type PostListApiResponse = BaseListApiResponse & {
  posts: PostModel[];
};
