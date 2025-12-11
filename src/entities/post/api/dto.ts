import { PostModel } from "../model/types";

export type AddPostDto = Pick<PostModel, "title" | "body" | "userId">;

export type UpdatePostDto = Pick<PostModel, "title" | "body" | "userId">;
