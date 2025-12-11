/**
 * URL 파라미터 관리 유틸리티
 */

/**
 * URLSearchParams를 객체로 변환
 */
export const getUrlParams = (search: string): Record<string, string> => {
  const params = new URLSearchParams(search)
  const result: Record<string, string> = {}
  params.forEach((value, key) => {
    result[key] = value
  })
  return result
}

/**
 * 객체를 URLSearchParams로 변환하여 URL 업데이트
 */
export const updateURL = (
  navigate: (path: string) => void,
  pathname: string,
  params: Record<string, string | number | null | undefined>
) => {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      searchParams.set(key, String(value))
    }
  })
  
  const queryString = searchParams.toString()
  const newPath = queryString ? `${pathname}?${queryString}` : pathname
  navigate(newPath)
}

/**
 * URL 파라미터에서 숫자 값 가져오기
 */
export const getNumberParam = (search: string, key: string, defaultValue: number): number => {
  const params = new URLSearchParams(search)
  const value = params.get(key)
  return value ? parseInt(value, 10) : defaultValue
}

/**
 * URL 파라미터에서 문자열 값 가져오기
 */
export const getStringParam = (search: string, key: string, defaultValue: string = ''): string => {
  const params = new URLSearchParams(search)
  return params.get(key) || defaultValue
}

