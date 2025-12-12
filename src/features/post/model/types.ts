import { PostModel } from "../../../entities/post";
import { UserModel } from "../../../entities/user";
import { BaseListApiResponse } from "../../../shared/api/types";

export type PostFormData = Pick<PostModel, "title" | "body" | "userId">;

export interface PostTableData extends PostModel {
  author?: UserModel;
}

export interface PostTableListData extends BaseListApiResponse {
  posts: PostTableData[];
}
