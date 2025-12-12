export interface GetUserResponse {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: string
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: {
    color: string
    type: string
  }
  ip: string
  address: GetUserResponseAddress
  macAddress: string
  university: string
  bank: GetUserResponseBank
  company: GetUserResponseCompany
  ein: string
  ssn: string
  userAgent: string
  crypto: {
    coin: string
    wallet: string
    network: string
  }
  role: string
}

interface GetUserResponseAddress {
  address: string
  city: string
  state: string
  stateCode: string
  postalCode: string
  coordinates: {
    lat: number
    lng: number
  }
  country: string
}

interface GetUserResponseBank {
  cardExpire: string
  cardNumber: string
  cardType: string
  currency: string
  iban: string
}

interface GetUserResponseCompany {
  department: string
  name: string
  title: string
  address: {
    address: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    coordinates: {
      lat: number
      lng: number
    }
    country: string
  }
}

export interface GetUsersResponse {
  users: { id: number; username: string; image: string }[]
  total: number
  skip: number
  limit: number
}
