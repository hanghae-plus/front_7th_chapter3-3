import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../shared/ui"
import { useSortBySelect } from "../lib/useSortBySelect"

const SORT_BY_OPTIONS = [
  { value: "none", label: "없음" },
  { value: "id", label: "ID" },
  { value: "title", label: "제목" },
  { value: "reactions", label: "반응" },
]

const SortBySelect = () => {
  const { selectedSortBy, handleChangeSortBy } = useSortBySelect()

  return (
    <Select value={selectedSortBy} onValueChange={handleChangeSortBy}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 기준" />
      </SelectTrigger>
      <SelectContent>
        {SORT_BY_OPTIONS.map(({ value, label }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SortBySelect
