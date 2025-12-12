import { useQueryParams } from "../../../shared/lib/useQueryParams"

export const useSortBySelect = () => {
  const { getQueryParam, updateQuery } = useQueryParams()
  const selectedSortBy = getQueryParam("sortBy")

  const handleChangeSortBy = (sortBy: string) => {
    updateQuery({ sortBy })
  }

  return {
    selectedSortBy,
    handleChangeSortBy,
  }
}
