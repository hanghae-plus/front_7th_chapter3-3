import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { postApi } from "../api"
import type { CreatePostDto, PostsResponse, UpdatePostDto } from "@/shared/types"

export const POST_QUERY_KEY = "posts"

export const useQueryPosts = (params: { limit: number; skip: number; enabled?: boolean }) => {
  return useQuery({
    queryKey: [POST_QUERY_KEY, params.limit, params.skip],
    queryFn: () => postApi.getPosts(params),
    enabled: params.enabled !== false,
  })
}

export const useQueryPostsSearch = (query: string) => {
  return useQuery({
    queryKey: [POST_QUERY_KEY, "search", query],
    queryFn: () => postApi.searchPosts(query),
    enabled: !!query,
  })
}

export const useQueryPostsByTag = (tag: string) => {
  return useQuery({
    queryKey: [POST_QUERY_KEY, "tag", tag],
    queryFn: () => postApi.getPostsByTag(tag),
    enabled: !!tag && tag !== "all",
  })
}

export const useMutationPostAdd = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePostDto) => postApi.createPost(data),
    onSuccess: (newPost) => {
      console.log("newPost", newPost)

      // POST_QUERY_KEY로 시작하는 모든 쿼리를 가져오기
      const queries = queryClient.getQueriesData({ queryKey: [POST_QUERY_KEY] })

      queries.forEach(([key, oldData]) => {
        // oldData가 없으면 패스
        if (!oldData) return

        // PostsResponse에만 적용하기 (search/tag도 PostsResponse 구조임)
        const old = oldData as PostsResponse

        queryClient.setQueryData(key, {
          ...old,
          posts: [newPost, ...old.posts],
          total: old.total + 1,
        })
      })
    },
  })
}

export const useMutationPostUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdatePostDto }) => postApi.updatePost(id, data),
    onSuccess: (updatedPost) => {
      const queries = queryClient.getQueriesData({ queryKey: [POST_QUERY_KEY] })

      queries.forEach(([key, oldData]) => {
        if (!oldData) return

        const old = oldData as PostsResponse

        queryClient.setQueryData(key, {
          ...old,
          posts: old.posts.map((p) =>
            p.id === updatedPost.id ? updatedPost : p
          ),
        })
      })
    },
  })
}

export const useMutationPostDelete = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => postApi.deletePost(id),
    onSuccess: (_, deletedId) => {
      const queries = queryClient.getQueriesData({ queryKey: [POST_QUERY_KEY] })

      queries.forEach(([key, oldData]) => {
        if (!oldData) return

        const old = oldData as PostsResponse

        queryClient.setQueryData(key, {
          ...old,
          posts: old.posts.filter((p) => p.id !== deletedId),
          total: old.total - 1,
        })
      })
    },
  })
}

export const useMutationPostLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, likes }: { id: number; likes: number }) => postApi.likePost(id, likes),

    // 낙관적 업데이트: API 호출 전에 UI를 먼저 업데이트
    // Mock 데이터 환경에서는 서버 응답을 신뢰할 수 없으므로 낙관적 업데이트만 유지
    onMutate: async (variables) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: [POST_QUERY_KEY] })

      // 모든 posts 쿼리에 낙관적 업데이트 적용
      const queries = queryClient.getQueriesData({ queryKey: [POST_QUERY_KEY] })

      queries.forEach(([key, oldData]) => {
        if (!oldData) return

        const old = oldData as PostsResponse

        queryClient.setQueryData(key, {
          ...old,
          posts: old.posts.map((post) =>
            post.id === variables.id
              ? {
                  ...post,
                  reactions: {
                    ...post.reactions,
                    likes: (post.reactions?.likes || 0) + 1,
                  },
                }
              : post
          ),
        })
      })
    },

    // Mock 데이터 환경에서는 서버 응답을 무시하고 낙관적 업데이트만 유지
    // onSuccess와 onError는 제거하여 롤백이나 서버 응답 업데이트가 발생하지 않도록 함
  })
}

export const useMutationPostDislike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, dislikes }: { id: number; dislikes: number }) => postApi.dislikePost(id, dislikes),

    // 낙관적 업데이트: API 호출 전에 UI를 먼저 업데이트
    // Mock 데이터 환경에서는 서버 응답을 신뢰할 수 없으므로 낙관적 업데이트만 유지
    onMutate: async (variables) => {
      // 진행 중인 refetch 취소
      await queryClient.cancelQueries({ queryKey: [POST_QUERY_KEY] })

      // 모든 posts 쿼리에 낙관적 업데이트 적용
      const queries = queryClient.getQueriesData({ queryKey: [POST_QUERY_KEY] })

      queries.forEach(([key, oldData]) => {
        if (!oldData) return

        const old = oldData as PostsResponse

        queryClient.setQueryData(key, {
          ...old,
          posts: old.posts.map((post) =>
            post.id === variables.id
              ? {
                  ...post,
                  reactions: {
                    ...post.reactions,
                    dislikes: (post.reactions?.dislikes || 0) + 1,
                  },
                }
              : post
          ),
        })
      })
    },

    // Mock 데이터 환경에서는 서버 응답을 무시하고 낙관적 업데이트만 유지
    // onSuccess와 onError는 제거하여 롤백이나 서버 응답 업데이트가 발생하지 않도록 함
  })
}
