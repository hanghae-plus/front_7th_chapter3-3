import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select"
import { useAtom } from "jotai"
import { orderAtom } from "../model/atoms"

export const ByOrder = () => {
  const [sortOrder, setSortOrder] = useAtom(orderAtom)

  return (
    <Select value={sortOrder} onValueChange={(value: typeof sortOrder) => setSortOrder(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 순서" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="asc">오름차순</SelectItem>
        <SelectItem value="desc">내림차순</SelectItem>
      </SelectContent>
    </Select>
  )
}
