import { useQuery } from "@tanstack/react-query"
import getUserApi from "../api/getUserApi"

const useUserQuery = ({ id }: { id: number }) => {
  const { data: user } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserApi({ id }),
    enabled: !!id,
  })

  return { user }
}

export default useUserQuery
