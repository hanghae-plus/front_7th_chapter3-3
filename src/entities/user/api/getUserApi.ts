import { mapUserDtoToUser } from "../model/user.mapper"
import { User } from "../model/user"
import { getApiUrl } from "../../../shared/api/apiClient"

const getUserApi = async ({ id }: { id: number }): Promise<User | undefined> => {
  try {
    if (!id) return undefined
    const response = await fetch(getApiUrl(`/users/${id}`))
    const data = await response.json()
    return mapUserDtoToUser(data)
  } catch (error) {
    console.error("사용자 가져오기 오류:", error)
  }
}

export default getUserApi
