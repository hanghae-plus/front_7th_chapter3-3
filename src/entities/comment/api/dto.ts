import { BaseListApiResponse } from "../../../shared/api/types";
import { CommentModel } from "../model/types";

export type AddCommentDto = Pick<CommentModel, "body" | "postId"> & { userId: number };

export type UpdateCommentDto = Pick<CommentModel, "body" | "likes">;

export type CommentListApiResponse = BaseListApiResponse & {
  comments: CommentModel[];
};
