// import { AxiosRequestConfig } from "axios"

export interface ApiResponse<T> {
  data: T

  // status: number
  // statusText: string
  // headers: Record<string, string>
  // config: AxiosRequestConfig
}

export interface Data {
  total: number
  skip: number
  limit: number
}
