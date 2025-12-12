import { QueryClient } from "@tanstack/react-query"
import { addPost, deletePost, updatePost } from "../../../entities/post/api/api"
import {
  AddPostBody,
  AddPostResponse,
  DeletePostResponse,
  UpdatePostBody,
  UpdatePostResponse,
} from "../../../entities/post/model/types"
import { userQueries } from "../../../entities/user/api/queries"
import { getErrorMessage } from "../../../shared/model/error"
import { useToastStore } from "../../../shared/model/useToast"
import { PostWithAuthor, PostWithAuthorResponse } from "../model/types"
import { postWithAuthorQueries } from "./queries"

export const postMutations = {
  add: (queryClient: QueryClient) => ({
    mutationFn: (body: AddPostBody) => addPost(body),
    onError: (error: unknown) => {
      const message = getErrorMessage(error)
      console.error("게시물 추가 실패:", message)
      useToastStore.getState().showToast(`게시물 추가에 실패했습니다: ${message}`, "error")
    },
    onSuccess: async (data: AddPostResponse) => {
      const allListQueries = queryClient.getQueriesData<PostWithAuthorResponse>({
        queryKey: [...postWithAuthorQueries.all, "list"],
      })
      const user = await queryClient.ensureQueryData(userQueries.detail(data.userId))

      allListQueries.forEach(([queryKey, listData]) => {
        if (listData) {
          queryClient.setQueryData<PostWithAuthorResponse>(queryKey, {
            ...listData,
            data: [
              {
                ...data,
                id: Math.max(...listData.data.map(({ id }) => id), listData.total) + 1,
                tags: [],
                reactions: { likes: 0, dislikes: 0 },
                views: 0,
                author: {
                  id: user?.id || data.userId,
                  image: user?.image || "",
                  username: user?.username || "",
                },
              },
              ...listData.data,
            ],
            total: listData.total + 1,
          })
        }
      })
    },
  }),
  update: (queryClient: QueryClient) => ({
    mutationFn: ({ id, body }: { id: number; body: UpdatePostBody }) => updatePost(id, body),
    onSettled: (
      _: UpdatePostResponse | undefined,
      _error: Error | null,
      { id, body }: { id: number; body: UpdatePostBody },
    ) => {
      try {
        const allListQueries = queryClient.getQueriesData<PostWithAuthorResponse>({
          queryKey: [...postWithAuthorQueries.all, "list"],
        })
        allListQueries.forEach(([queryKey, listData]) => {
          if (listData) {
            queryClient.setQueryData<PostWithAuthorResponse>(queryKey, {
              ...listData,
              data: listData.data.map((post) => (post.id === id ? { ...post, ...body } : post)),
            })
          }
        })

        const detailQueryKey = [...postWithAuthorQueries.all, "detail", id]
        const detailData = queryClient.getQueryData<PostWithAuthor>(detailQueryKey)
        if (detailData) {
          queryClient.setQueryData<PostWithAuthor>(detailQueryKey, {
            ...detailData,
            ...body,
          })
        }
      } catch (error) {
        const message = getErrorMessage(error)
        console.error("게시물 수정 실패:", message)
        useToastStore.getState().showToast(`게시물 수정에 실패했습니다: ${message}`, "error")
      }
    },
  }),
  delete: (queryClient: QueryClient) => ({
    mutationFn: (id: number) => deletePost(id),
    onSettled: (_: DeletePostResponse | undefined, _error: Error | null, id: number) => {
      try {
        const allListQueries = queryClient.getQueriesData<PostWithAuthorResponse>({
          queryKey: [...postWithAuthorQueries.all, "list"],
        })
        allListQueries.forEach(([queryKey, listData]) => {
          if (listData) {
            queryClient.setQueryData<PostWithAuthorResponse>(queryKey, {
              ...listData,
              data: listData.data.filter((post) => post.id !== id),
              total: listData.total - 1,
            })
          }
        })
      } catch (error) {
        const message = getErrorMessage(error)
        console.error("게시물 삭제 실패:", message)
        useToastStore.getState().showToast(`게시물 삭제에 실패했습니다: ${message}`, "error")
      }
    },
  }),
}
