import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { useLimitSelect } from "../lib/useLimitSelect"

const LIMIT_OPTIONS = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
]

const LimitSelect = () => {
  const { selectedLimit, handleChangeLimit } = useLimitSelect()

  return (
    <Select value={selectedLimit} onValueChange={handleChangeLimit}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="10" />
      </SelectTrigger>
      <SelectContent>
        {LIMIT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default LimitSelect
