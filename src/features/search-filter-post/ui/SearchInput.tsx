import { Search } from "lucide-react"
import { Input } from "../../../shared/components"

export function SearchInput({
  value,
  onChange,
  onKeyPress,
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
}) {
  return (
    <>
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input placeholder="게시물 검색..." className="pl-8" value={value} onChange={onChange} onKeyPress={onKeyPress} />
    </>
  )
}
