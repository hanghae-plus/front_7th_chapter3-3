import { useQueryParams } from "../../../shared/lib/useQueryParams"

export const useTagSelect = () => {
  const { getQueryParam, updateQuery } = useQueryParams()
  const selectedTag = getQueryParam("tag")

  const handleChangeTag = (tag: string) => {
    updateQuery({ tag })
  }

  return {
    selectedTag,
    handleChangeTag,
  }
}
