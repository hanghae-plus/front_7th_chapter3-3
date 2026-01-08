/**
 * User View Feature UI
 * 
 * 사용자 정보 모달 컴포넌트
 */

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { useUserView } from "../model/use-user-view"
import { useUIStore } from "../../../shared/lib/stores"

/**
 * 사용자 정보 모달
 */
export function UserViewModal() {
  const { showUserModal, setShowUserModal } = useUIStore()
  const { selectedUser, setSelectedUser } = useUserView()

  if (!selectedUser) return null

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setShowUserModal(false)
      setSelectedUser(null)
    }
  }

  return (
    <Dialog open={showUserModal} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>사용자 정보</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <img
            src={selectedUser.image}
            alt={selectedUser.username}
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h3 className="text-xl font-semibold text-center">{selectedUser.username}</h3>
          <div className="space-y-2">
            {selectedUser.firstName && selectedUser.lastName && (
              <p>
                <strong>이름:</strong> {selectedUser.firstName} {selectedUser.lastName}
              </p>
            )}
            {selectedUser.age && (
              <p>
                <strong>나이:</strong> {selectedUser.age}
              </p>
            )}
            {selectedUser.email && (
              <p>
                <strong>이메일:</strong> {selectedUser.email}
              </p>
            )}
            {selectedUser.phone && (
              <p>
                <strong>전화번호:</strong> {selectedUser.phone}
              </p>
            )}
            {selectedUser.address && (
              <p>
                <strong>주소:</strong> {selectedUser.address.address}, {selectedUser.address.city},{" "}
                {selectedUser.address.state}
              </p>
            )}
            {selectedUser.company && (
              <p>
                <strong>직장:</strong> {selectedUser.company.name} - {selectedUser.company.title}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

