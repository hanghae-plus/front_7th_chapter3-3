import { fetchUserById } from "@/entities/user"
import { selectedUserAtom, showUserInfoAtom } from "@/entities/user/model/atoms"

import { useSetAtom } from "jotai"

interface Author {
  id: number
  username: string
  image: string
}

interface UserProfileProps {
  author: Author
}

export const UserProfile = ({ author }: UserProfileProps) => {
  const setSelectedUser = useSetAtom(selectedUserAtom)
  const setShowUserInfo = useSetAtom(showUserInfoAtom)

  const handleOpenUserInfo = async () => {
    try {
      const userData = await fetchUserById(author.id)
      setSelectedUser(userData)
      setShowUserInfo(true)
    } catch (error) {
      console.error("사용자 정보 가져오기 오류:", error)
    }
  }

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={handleOpenUserInfo}>
      <img src={author.image} alt={author.username} className="w-8 h-8 rounded-full" />
      <span>{author.username}</span>
    </div>
  )
}
