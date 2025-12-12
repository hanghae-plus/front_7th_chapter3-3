import { useQuery } from "@tanstack/react-query"
import getTagsApi from "../api/getTagsApi"

const useTagQuery = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => getTagsApi(),
    staleTime: 5 * 60 * 1000,
  })
}

export default useTagQuery
