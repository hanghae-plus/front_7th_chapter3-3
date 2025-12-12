import { useQueryParams } from "../../../shared/lib/useQueryParams"

export const useLimitSelect = () => {
  const { getQueryParam, updateQuery } = useQueryParams()
  const selectedLimit = getQueryParam("limit")

  const handleChangeLimit = (limit: string) => {
    updateQuery({ limit })
  }

  return {
    selectedLimit,
    handleChangeLimit,
  }
}
