import { useQuery } from "@tanstack/react-query"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui"
import { userQueries } from "@/entities/user"

interface ViewUserInfoDialogProps {
  userId: number | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ViewUserInfoDialog = ({ userId, open, onOpenChange }: ViewUserInfoDialogProps) => {
  // TanStack Query로 사용자 정보 조회 (userId와 open 상태에 따라 조건부 실행)
  const { data: user } = useQuery({
    ...userQueries.detail(userId || 0),
    enabled: !!userId && open, // userId가 있고 다이얼로그가 열렸을 때만 실행
  })

  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img src={user.image} alt={user.username} className="w-24 h-24 rounded-full mx-auto" />
          <h3 className="text-xl font-semibold text-center">{user.username}</h3>
          <div className="space-y-2">
            <p>
              <strong>이름:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>나이:</strong> {user.age}
            </p>
            <p>
              <strong>이메일:</strong> {user.email}
            </p>
            <p>
              <strong>전화번호:</strong> {user.phone}
            </p>
            <p>
              <strong>주소:</strong> {user.address?.address}, {user.address?.city}, {user.address?.state}
            </p>
            <p>
              <strong>직장:</strong> {user.company?.name} - {user.company?.title}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
