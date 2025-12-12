import { userKeys } from "../api/user-keys";
import { getUsersApi } from "../api/user-api";
import { useQuery } from "@tanstack/react-query";
import { UserGetQueryParams } from "../api/dto";
import { STALE_TIME } from "../../../shared/config/query-config";

interface UseUsersQueryProps {
  params?: UserGetQueryParams;
  enabled?: boolean;
}

export function useUsersQuery({ params = {}, enabled = true }: UseUsersQueryProps) {
  return useQuery({
    queryKey: userKeys.list(params),
    queryFn: () => getUsersApi(params),
    staleTime: STALE_TIME.SEMI_STATIC,
    enabled,
  });
}
