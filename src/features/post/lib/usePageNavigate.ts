import { useQueryParams } from "../../../shared/lib/useQueryParams"

export const usePageNavigate = () => {
  const { getQueryParam, updateQuery } = useQueryParams()
  const skip = parseInt(getQueryParam("skip"))
  const limit = parseInt(getQueryParam("limit"))

  const handleNavigate = {
    prev: () => {
      updateQuery({ skip: Math.max(0, skip - limit) })
    },
    next: () => {
      updateQuery({ skip: skip + limit })
    },
  }

  return {
    skip,
    limit,
    handleNavigate,
  }
}
