import type { Post } from "../model/types"
import type { User } from "@/entities/user"

export interface PostWithAuthor extends Post {
  author?: User
}
