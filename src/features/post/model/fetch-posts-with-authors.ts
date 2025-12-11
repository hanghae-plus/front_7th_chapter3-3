import { postsApi } from "@/entities/post"
import { usersApi } from "@/entities/user"

export const fetchPostsWithAuthors = async (limit: number, skip: number) => {
  const [postsData, usersData] = await Promise.all([
    postsApi.getPosts(limit, skip),
    usersApi.getUsers({ limit: 0, select: "username,image" }),
  ])

  return {
    posts: postsData.posts.map((post) => ({
      ...post,
      author: usersData.users.find((user) => user.id === post.userId),
    })),
    total: postsData.total,
  }
}
