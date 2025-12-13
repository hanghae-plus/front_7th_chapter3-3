import { useNavigate } from "react-router-dom"
import { UrlParams, generateQueryString } from "./utils"

export const useUpdateURL = () => {
  const navigate = useNavigate()

  return (params: UrlParams) => {
    const queryString = generateQueryString(params)
    navigate(queryString)
  }
}
