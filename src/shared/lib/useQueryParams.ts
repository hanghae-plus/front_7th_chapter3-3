import { useLocation, useNavigate } from "react-router-dom"

const DEFAULT_QUERY_PARAMS = {
  search: "",
  limit: "10",
  skip: "0",
  sortBy: "",
  order: "asc",
  tag: "all",
}

type Params = Record<string, string | number | undefined>

export const useQueryParams = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)

  const getQueryParam = (key: string) => {
    return queryParams.get(key) || DEFAULT_QUERY_PARAMS[key as keyof typeof DEFAULT_QUERY_PARAMS] || ""
  }

  const updateQuery = (params: Params) => {
    const search = new URLSearchParams(queryParams)

    Object.entries(params).forEach(([k, v]) => {
      if (v) search.set(k, String(v))
      else search.delete(k)
    })

    navigate(`?${search.toString()}`)
  }

  return {
    queryParams,
    getQueryParam,
    updateQuery,
  }
}
