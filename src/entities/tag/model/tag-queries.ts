import { useTagsQuery } from "./use-tags-query"

export const useTags = () => {
  const { data: tags = [] } = useTagsQuery()
  return tags
}
