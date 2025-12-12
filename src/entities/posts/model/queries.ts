import { useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { postQueries } from "./queryFactory"

export const useSuspensePostList = (limit: number, skip: number) => {
  return useSuspenseQuery(postQueries.list(limit, skip))
}

export const useSuspensePostTags = () => {
  return useSuspenseQuery(postQueries.tags())
}

export const useSuspensePostSearch = (query: string) => {
  return useSuspenseQuery(postQueries.search(query))
}

export const useSuspensePostByTag = (tag: string) => {
  return useSuspenseQuery(postQueries.byTag(tag))
}

export const usePostList = (limit: number, skip: number) => {
  return useQuery(postQueries.list(limit, skip))
}

export const usePostTags = () => {
  return useQuery(postQueries.tags())
}

export const usePostSearch = (query: string) => {
  return useQuery({
    ...postQueries.search(query),
    enabled: !!query.trim(),
  })
}

export const usePostByTag = (tag: string) => {
  return useQuery({
    ...postQueries.byTag(tag),
    enabled: !!tag && tag !== "all",
  })
}
