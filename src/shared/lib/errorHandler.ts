import { AxiosError } from 'axios'

export const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message

    switch (status) {
      case 400:
        return `잘못된 요청입니다: ${message}`
      case 401:
        return '인증이 필요합니다. 다시 로그인해주세요.'
      case 403:
        return '권한이 없습니다.'
      case 404:
        return '요청한 리소스를 찾을 수 없습니다.'
      case 500:
        return '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      default:
        return `오류가 발생했습니다: ${message}`
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return '알 수 없는 오류가 발생했습니다.'
}

export const showErrorToast = (error: unknown) => {
  const message = handleApiError(error)
  // TODO: Toast 라이브러리 연동 시 사용
  console.error('[API Error]', message)
  alert(message)
}
