import { UserDetail } from "../model/user"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"

interface UserModalProps {
  user: UserDetail | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const UserModal = ({ user, open, onOpenChange }: UserModalProps) => {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img src={user.image} alt={user.username} className="w-16 h-16 rounded-full" />
            <div>
              <h3 className="font-semibold">{user.username}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
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
              <strong>주소:</strong> {user.address?.address || ""}, {user.address?.city || ""},{" "}
              {user.address?.state || ""}
            </p>
            <p>
              <strong>직장:</strong> {user.company?.name || ""} - {user.company?.title || ""}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
