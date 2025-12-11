import { PostModel } from "../../../entities/post/model/types";

export type PostFormData = Pick<PostModel, "title" | "body" | "userId">;
