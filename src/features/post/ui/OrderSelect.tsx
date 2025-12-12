import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { useOrderSelect } from "../lib/useOrderSelect"

const ORDER_OPTIONS = [
  { value: "asc", label: "오름차순" },
  { value: "desc", label: "내림차순" },
]

const OrderSelect = () => {
  const { selectedOrder, handleChangeOrder } = useOrderSelect()

  return (
    <Select value={selectedOrder} onValueChange={handleChangeOrder}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서" />
      </SelectTrigger>
      <SelectContent>
        {ORDER_OPTIONS.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default OrderSelect
