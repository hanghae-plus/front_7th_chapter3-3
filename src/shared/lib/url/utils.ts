export interface UrlParams {
  [key: string]: string | number | boolean | undefined | null
}

export const generateQueryString = (params: UrlParams) => {
  const queryParams = new URLSearchParams()

  Object.keys(params).forEach((key) => {
    const value = params[key]
    if (value !== undefined && value !== null && value !== "") {
      queryParams.set(key, value.toString())
    }
  })

  return `?${queryParams.toString()}`
}
