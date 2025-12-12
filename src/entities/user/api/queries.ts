import { useQuery } from '@tanstack/react-query'
import { userApi } from './userApi'

export const userKeys = {
  all: ['users'] as const,
  detail: (id: number) => [...userKeys.all, 'detail', id] as const,
}

export const useUser = (id: number | undefined, enabled = true) => {
  return useQuery({
    queryKey: userKeys.detail(id!),
    queryFn: () => userApi.getUser(id!),
    enabled: enabled && !!id,
  })
}
