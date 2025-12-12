export interface ApiError {
  message: string
  status?: number
  code?: string
}

export const isApiError = (error: unknown): error is ApiError => {
  return typeof error === "object" && error !== null && "message" in error
}

export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  if (typeof error === "string") {
    return error
  }
  return "알 수 없는 오류가 발생했습니다."
}

export const getErrorStatus = (error: unknown): number | undefined => {
  if (isApiError(error) && error.status) {
    return error.status
  }
  return undefined
}
