export const fetchPosts = async (options?: { skip: number; limit: number }) => {
  const skip = options?.skip || 0
  const limit = options?.limit || 10

  const res = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
  const data = await res.json()
  return data
}
