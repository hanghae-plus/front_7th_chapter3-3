interface UserAvatarProps {
  username: string
  image: string
  onClick?: () => void
}

export function UserAvatar({ username, image, onClick }: UserAvatarProps) {
  return (
    <div
      className={`flex items-center gap-2 ${onClick ? "cursor-pointer hover:opacity-80" : ""}`}
      onClick={onClick}
    >
      <img src={image} alt={username} className="w-8 h-8 rounded-full object-cover" />
      <span className="text-sm">{username}</span>
    </div>
  )
}
