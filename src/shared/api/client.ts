export const apiClient = {
  async get<T>(url: string): Promise<T> {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    return response.json()
  },

  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    return response.json()
  },

  async put<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    return response.json()
  },

  async patch<T>(url: string, data: unknown): Promise<T> {
    const response = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
    return response.json()
  },

  async delete(url: string): Promise<void> {
    const response = await fetch(url, {
      method: "DELETE",
    })
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }
  },
}
