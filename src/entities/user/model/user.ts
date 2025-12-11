export interface User {
  id: number
  username: string
  image: string
}

export interface Address {
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

export interface Company {
  department: string
  name: string
  title: string
  address: Address
}

export interface UserDetail extends User {
  firstName: string
  lastName: string
  age: number
  email: string
  phone: string
  birthDate: string
  address: Address
  company: Company
}
