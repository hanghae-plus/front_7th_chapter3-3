import { useQueryParams } from "../../../shared/lib/useQueryParams"

export const useOrderSelect = () => {
  const { getQueryParam, updateQuery } = useQueryParams()
  const selectedOrder = getQueryParam("order")

  const handleChangeOrder = (order: string) => {
    updateQuery({ order })
  }

  return {
    selectedOrder,
    handleChangeOrder,
  }
}
