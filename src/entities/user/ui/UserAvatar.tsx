import { User } from "../model/types"

interface UserAvatarProps {
  user: User
  onClick?: () => void
}

export const UserAvatar = ({ user, onClick }: UserAvatarProps) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={onClick}>
      <img src={user.image} alt={user.username} className="w-8 h-8 rounded-full" />
      <span>{user.username}</span>
    </div>
  )
}
