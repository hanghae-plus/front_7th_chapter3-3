import { GetUserResponse } from "./user.dto"
import { User } from "./user"

export const mapUserDtoToUser = (dto: GetUserResponse): User => ({
  id: dto.id,
  firstName: dto.firstName,
  lastName: dto.lastName,
  age: dto.age,
  email: dto.email,
  phone: dto.phone,
  username: dto.username,
  address: dto.address,
  company: dto.company,
  image: dto.image,
})
