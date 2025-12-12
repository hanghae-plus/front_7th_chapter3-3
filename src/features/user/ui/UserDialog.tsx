import { Dialog } from "../../../shared/ui"
import { useUserDialogStore } from "../model/useUserDialogStore"
import useUserQuery from "../../../entities/user/model/useUserQuery"
import useSelectedUserStore from "../../../entities/user/model/useSelectedUserStore"

const UserDialog = () => {
  const showUserDialog = useUserDialogStore((state) => state.showUserDialog)
  const setShowUserDialog = useUserDialogStore((state) => state.setShowUserDialog)
  const selectedUserId = useSelectedUserStore((state) => state.selectedUserId)

  const { user } = useUserQuery({ id: selectedUserId || 0 })

  if (!selectedUserId) return null

  return (
    <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>사용자 정보</Dialog.Title>
        </Dialog.Header>
        <div className="space-y-4">
          <img src={user?.image} alt={user?.username} className="w-24 h-24 rounded-full mx-auto" />
          <h3 className="text-xl font-semibold text-center">{user?.username}</h3>
          <div className="space-y-2">
            <p>
              <strong>이름:</strong> {user?.firstName} {user?.lastName}
            </p>
            <p>
              <strong>나이:</strong> {user?.age}
            </p>
            <p>
              <strong>이메일:</strong> {user?.email}
            </p>
            <p>
              <strong>전화번호:</strong> {user?.phone}
            </p>
            <p>
              <strong>주소:</strong> {user?.address?.address}, {user?.address?.city}, {user?.address?.state}
            </p>
            <p>
              <strong>직장:</strong> {user?.company?.name} - {user?.company?.title}
            </p>
          </div>
        </div>
      </Dialog.Content>
    </Dialog>
  )
}

export default UserDialog
