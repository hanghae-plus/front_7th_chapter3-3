export const deletePost = async (id: number) => {
  try {
    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error("게시물 삭제 오류:", error)
    return null
  }
}
