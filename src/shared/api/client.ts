import axios from 'axios'

declare const __API_BASE_URL__: string

export const apiClient = axios.create({
  baseURL: __API_BASE_URL__,
  headers: {
    'Content-Type': 'application/json',
  },
})
