import { UserBase } from "../../../entities/user/model/types"
import { useDialogActions } from "../../../shared/model/useDialog"

interface UserInfoProps {
  user: UserBase
}

const UserInfo = ({ user }: UserInfoProps) => {
  const { setDialog } = useDialogActions()

  return (
    <div
      className="flex items-center space-x-2 cursor-pointer"
      onClick={() => setDialog({ type: "user", id: user.id })}
    >
      <img src={user.image} alt={user.username} className="w-8 h-8 rounded-full" />
      <span>{user.username}</span>
    </div>
  )
}

export default UserInfo
