import { useAtom } from "jotai"
import { sortAtom } from "../model/atoms"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/Select"

export const BySort = () => {
  const [sortBy, setSortBy] = useAtom(sortAtom)

  return (
    <Select value={sortBy} onValueChange={(value: typeof sortBy) => setSortBy(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 기준" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="none">없음</SelectItem>
        <SelectItem value="id">ID</SelectItem>
        <SelectItem value="title">제목</SelectItem>
        <SelectItem value="reactions">반응</SelectItem>
      </SelectContent>
    </Select>
  )
}
