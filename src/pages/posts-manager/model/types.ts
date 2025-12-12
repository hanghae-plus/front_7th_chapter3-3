import { PaginationParams } from "../../../shared/types";
import { PostFilterParams } from "../../../features/post-filter";

export type PostsUrlQueryParams = PaginationParams & PostFilterParams;
