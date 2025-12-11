import { useQuery } from '@tanstack/react-query'
import { postApi } from '../../../entities/post/api'
import { userApi } from '../../../entities/user/api'
import { postKeys, userKeys } from '../../../shared/lib'
import type { Post, PostAuthor } from '../../../entities/post'

/**
 * 태그 필터 기능
 */
export const useTags = () => {
  return useQuery({
    queryKey: postKeys.tags(),
    queryFn: () => postApi.getTags(),
  })
}

export const usePostsByTag = (tag: string) => {
  // 태그별 게시물 조회
  const postsQuery = useQuery({
    queryKey: postKeys.byTag(tag),
    queryFn: () => postApi.getPostsByTag(tag),
    enabled: tag !== 'all' && tag.length > 0, // 'all'이 아니고 태그가 있을 때만 실행
    refetchOnMount: true, // 컴포넌트 마운트 시 항상 리프레시
  })

  // 사용자 정보 조회 (author 매핑용)
  const usersQuery = useQuery({
    queryKey: userKeys.list({ limit: 0, select: 'username,image' }),
    queryFn: () => userApi.getUsers({ limit: 0, select: 'username,image' }),
    enabled: postsQuery.isSuccess, // 게시물 조회 성공 시에만 실행
  })

  // author 정보 매핑 (비즈니스 로직)
  const postsWithAuthors: Post[] | undefined = postsQuery.data && usersQuery.data
    ? postsQuery.data.posts.map((post) => {
        const user = usersQuery.data.users.find((u) => u.id === post.userId)
        const author: PostAuthor | undefined = user
          ? {
              id: user.id,
              username: user.username,
              image: user.image,
            }
          : undefined

        return {
          ...post,
          author,
        }
      })
    : undefined

  return {
    data: postsWithAuthors
      ? {
          ...postsQuery.data,
          posts: postsWithAuthors,
        }
      : undefined,
    isLoading: postsQuery.isLoading || usersQuery.isLoading,
    isError: postsQuery.isError || usersQuery.isError,
    error: postsQuery.error || usersQuery.error,
    refetch: postsQuery.refetch,
  }
}
