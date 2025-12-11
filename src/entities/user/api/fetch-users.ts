export const fetchUsers = async (options?: { limit: number; select: string[] }) => {
  const limit = options?.limit || 0
  const select = options?.select || []

  const res = await fetch(`/api/users?limit=${limit}&select=${select.join(",")}`)
  const data = await res.json()
  return data
}
