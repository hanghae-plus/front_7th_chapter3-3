import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { commentQueries } from "./queryFactory"

export const useSuspenseCommentList = (postId: number) => {
  return useSuspenseQuery(commentQueries.list(postId))
}

export const useCommentList = (postId: number) => {
  return useQuery(commentQueries.list(postId))
}
