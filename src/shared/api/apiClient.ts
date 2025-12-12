const BASE_URL = "/api"

interface RequestConfig {
  params?: Record<string, string | number | boolean | undefined>
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          url.searchParams.append(key, String(value))
        }
      })
    }
    return url.toString()
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
    const url = this.buildUrl(endpoint, config?.params)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    return response.json()
  }

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    return response.json()
  }

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    return response.json()
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : undefined,
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    return response.json()
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }
    return response.json()
  }
}

export const apiClient = new ApiClient(BASE_URL)
