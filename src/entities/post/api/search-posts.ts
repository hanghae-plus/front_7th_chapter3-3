export const searchPosts = async (query: string) => {
  const response = await fetch(`/api/posts/search?q=${query}`)
  return await response.json()
}
