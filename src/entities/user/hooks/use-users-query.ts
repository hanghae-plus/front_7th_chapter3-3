import { userKeys } from "../api/userKeys";
import { getUsersApi } from "../api/user-api";
import { useQuery } from "@tanstack/react-query";
import { UserGetQueryParams } from "../api/dto";

interface UseUsersQueryProps {
  params?: UserGetQueryParams;
  enabled?: boolean;
}

export function useUsersQuery({ params = {}, enabled = true }: UseUsersQueryProps) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => getUsersApi(params),
    enabled,
  });
}
