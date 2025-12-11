import { useQuery } from '@tanstack/react-query'
import { userApi } from '../../../entities/user/api'
import { userKeys } from '../../../shared/lib'

/**
 * 사용자 상세 정보 조회 기능
 */
export const useUserDetail = (id: number) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getUser(id),
    enabled: id > 0, // id가 유효할 때만 실행
  })
}
