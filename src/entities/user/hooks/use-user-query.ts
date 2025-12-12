import { useQuery } from "@tanstack/react-query";
import { userKeys } from "../api/userKeys";
import { getUserApi } from "../api/user-api";

interface UseUserQueryProps {
  userId: number;
  enabled?: boolean;
}

export function useUserQuery({ userId, enabled = true }: UseUserQueryProps) {
  return useQuery({
    queryKey: userKeys.detail(userId),
    queryFn: () => getUserApi(userId),
    enabled,
  });
}
