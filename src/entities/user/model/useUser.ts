import { useQuery } from "@tanstack/react-query"
import { getUserDetail, getUsers } from "../api"

// 1. 내 정보 가져오기 Hook
export const useCurrentUser = () => {
  const { data: user, isLoading: loading } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => getUserDetail(1),
    // 윈도우 포커스 시 재요청 방지 (선택 사항)
    refetchOnWindowFocus: false,
  })

  return { user, loading }
}

// 2. 유저 통계 가져오기 Hook
export const useUserStats = () => {
  const { data } = useQuery({
    queryKey: ["userStats"],
    queryFn: getUsers, // ✅ 전체 유저 목록 조회 (limit=0은 API 내부나 호출시 처리)
  })

  return { count: data?.total || 0 }
}
