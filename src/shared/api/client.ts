/**
 * 공통 API 클라이언트 설정
 * 필요시 fetch 래퍼, 에러 처리, 인터셉터 등을 추가할 수 있습니다.
 */

/**
 * 기본 fetch 래퍼 (필요시 확장)
 */
export const apiClient = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${url}`)
    }
    return response.json()
  },

  post: async <T>(url: string, data: unknown): Promise<T> => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`Failed to post: ${url}`)
    }
    return response.json()
  },

  put: async <T>(url: string, data: unknown): Promise<T> => {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`Failed to put: ${url}`)
    }
    return response.json()
  },

  patch: async <T>(url: string, data: unknown): Promise<T> => {
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`Failed to patch: ${url}`)
    }
    return response.json()
  },

  delete: async (url: string): Promise<void> => {
    const response = await fetch(url, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`Failed to delete: ${url}`)
    }
  },
}

