import { ChangeEvent, KeyboardEvent, useState } from "react"
import { useQueryParams } from "../../../shared/lib/useQueryParams"

export const useSearch = () => {
  const { getQueryParam, updateQuery } = useQueryParams()
  const [search, setSearch] = useState(getQueryParam("search"))

  const handleSearch = {
    change: (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value),
    keydown: (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") return
      updateQuery({ search })
    },
  }

  return {
    search,
    handleSearch,
  }
}
