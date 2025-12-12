import { Post } from "../../../entities/post/model/types"
import { UserBase } from "../../../entities/user/model/types"

export interface PostWithAuthor extends Post {
  author: UserBase
}

export interface PostWithAuthorResponse {
  data: PostWithAuthor[]
  total: number
}
