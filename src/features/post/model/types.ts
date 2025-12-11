import { PostModel } from "../../../entities/post/model/types";
import { UserModel } from "../../../entities/user/model/types";
import { BaseListApiResponse } from "../../../shared/api/types";

export type PostFormData = Pick<PostModel, "title" | "body" | "userId">;

export interface PostTableData extends PostModel {
  author?: UserModel;
}

export interface PostTableListData extends BaseListApiResponse {
  posts: PostTableData[];
}
