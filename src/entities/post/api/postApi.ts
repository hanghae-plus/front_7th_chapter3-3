export const postApi = {
  getPosts: (limit: any, skip: any) => {
    fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      .then((res) => {
        return res.json()
      })
      .catch((error) => {
        console.error("게시물 가져오기 오류", error)
      })
  },
  addPost: async (newPost: any) => {
    try {
      const response = await fetch("/api/posts/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      })
      return await response.json()
    } catch (error) {
      console.error("게시물 추가 오류:", error)
    }
  },
  updatePost: async (selectedPost: any) => {
    try {
      const response = await fetch(`/api/posts/${selectedPost.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedPost),
      })
      return await response.json()
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
    }
  },
  deletePost: async (id: any) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      })
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
    }
  },
}
