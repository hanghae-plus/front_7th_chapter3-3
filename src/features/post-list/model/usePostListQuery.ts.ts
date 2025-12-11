import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { usePostListStore } from "./store"
// ✅ 여기서 불러오는 함수들이 이미 BASE_URL 처리가 되어 있습니다.
import { getPosts, searchPosts, getPostsByTag } from "@/entities/post/api"
import { getUsers } from "@/entities/user/api"
import { Post } from "@/entities/post/model/types"

export const usePostListQuery = () => {
  const { skip, limit, searchQuery, selectedTag, sortBy, sortOrder } = usePostListStore()

  return useQuery({
    // 모든 상태가 키에 포함되어야 함 (변경 시 재요청)
    queryKey: ["postList", { skip, limit, searchQuery, selectedTag, sortBy, sortOrder }],

    queryFn: async () => {
      let postsData: { posts: Post[]; total: number }

      // 1. 조건에 따라 다른 API 함수 호출
      // (각 함수 내부에서 배포 환경에 맞는 URL을 사용함)
      if (searchQuery) {
        postsData = await searchPosts(searchQuery, limit, skip, sortBy, sortOrder)
      } else if (selectedTag && selectedTag !== "all") {
        postsData = await getPostsByTag(selectedTag, limit, skip, sortBy, sortOrder)
      } else {
        postsData = await getPosts(limit, skip, sortBy, sortOrder)
      }

      // 2. 유저 정보 가져오기 (매핑용)
      const usersData = await getUsers()

      // 3. 데이터 합치기 (Join)
      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }))

      return {
        posts: postsWithUsers,
        total: postsData.total,
      }
    },
    placeholderData: keepPreviousData, // 페이지네이션 시 깜빡임 방지
    staleTime: 5000,
  })
}
