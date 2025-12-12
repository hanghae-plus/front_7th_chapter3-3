import { useQuery } from "@tanstack/react-query";
import { userKeys } from "../api/userKeys";
import { getUserApi } from "../api/user-api";
import { STALE_TIME } from "../../../shared/config/query-config";

interface UseUserQueryProps {
  userId: number;
  enabled?: boolean;
}

export function useUserQuery({ userId, enabled = true }: UseUserQueryProps) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUserApi(userId),
    staleTime: STALE_TIME.SEMI_STATIC,
    enabled,
  });
}
