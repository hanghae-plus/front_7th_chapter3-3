import { CommentModel } from "../../../entities/comment/model/types";

export type CommentFormData = Pick<CommentModel, "body" | "postId"> & { userId: number };
