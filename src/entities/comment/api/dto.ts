import { CommentModel } from "../model/types";

export type AddCommentDto = Pick<CommentModel, "body" | "postId"> & { userId: number };

export type UpdateCommentDto = Pick<CommentModel, "body">;
