# Optimistic Updates Guide

Optimistic updates improve UX by immediately reflecting changes in the UI before the server confirms.

## Pattern Overview

```typescript
useMutation({
  mutationFn: ...,
  onMutate: async (variables) => {
    // 1. Cancel outgoing refetches
    // 2. Snapshot previous value
    // 3. Optimistically update cache
    // 4. Return rollback context
  },
  onError: (error, variables, context) => {
    // 5. Rollback on error
  },
  onSettled: () => {
    // 6. Always refetch
  },
})
```

## Complete Example: Like Comment

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/shared/api'
import { commentApi, type CommentsResponse } from '@/entities/comment'

interface LikeParams {
  commentId: number
  postId: number
}

export function useLikeComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId }: LikeParams) =>
      commentApi.like(commentId),

    onMutate: async ({ commentId, postId }) => {
      // 1. Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: queryKeys.comments.byPost(postId),
      })

      // 2. Snapshot the previous value
      const previousData = queryClient.getQueryData<CommentsResponse>(
        queryKeys.comments.byPost(postId)
      )

      // 3. Optimistically update to the new value
      queryClient.setQueryData<CommentsResponse>(
        queryKeys.comments.byPost(postId),
        (old) => {
          if (!old) return old
          return {
            ...old,
            comments: old.comments.map((comment) =>
              comment.id === commentId
                ? { ...comment, likes: comment.likes + 1 }
                : comment
            ),
          }
        }
      )

      // 4. Return context with previous value
      return { previousData }
    },

    onError: (error, { postId }, context) => {
      // 5. Rollback cache on error
      if (context?.previousData) {
        queryClient.setQueryData(
          queryKeys.comments.byPost(postId),
          context.previousData
        )
      }
    },

    onSettled: (data, error, { postId }) => {
      // 6. Always refetch after mutation
      queryClient.invalidateQueries({
        queryKey: queryKeys.comments.byPost(postId),
      })
    },
  })
}
```

## Example: Delete Post

```typescript
export function useDeletePost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => postApi.deletePost(id),

    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.posts.all,
      })

      // Get all cached post queries
      const previousData = queryClient.getQueriesData<PostsResponse>({
        queryKey: queryKeys.posts.all,
      })

      // Remove from all cached lists
      queryClient.setQueriesData<PostsResponse>(
        { queryKey: queryKeys.posts.all },
        (old) => {
          if (!old) return old
          return {
            ...old,
            posts: old.posts.filter((p) => p.id !== deletedId),
            total: old.total - 1,
          }
        }
      )

      return { previousData }
    },

    onError: (error, deletedId, context) => {
      // Restore all previous data
      context?.previousData.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })
}
```

## Example: Add Post

```typescript
export function useAddPost() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePostRequest) => postApi.createPost(data),

    onMutate: async (newPost) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.posts.all,
      })

      const previousData = queryClient.getQueryData<PostsResponse>(
        queryKeys.posts.list({ skip: 0, limit: 10 })
      )

      // Add optimistic post with temporary ID
      const optimisticPost = {
        ...newPost,
        id: Date.now(), // Temporary ID
        tags: [],
        reactions: { likes: 0, dislikes: 0 },
        views: 0,
      }

      queryClient.setQueryData<PostsResponse>(
        queryKeys.posts.list({ skip: 0, limit: 10 }),
        (old) => {
          if (!old) return old
          return {
            ...old,
            posts: [optimisticPost, ...old.posts],
            total: old.total + 1,
          }
        }
      )

      return { previousData }
    },

    onError: (error, newPost, context) => {
      queryClient.setQueryData(
        queryKeys.posts.list({ skip: 0, limit: 10 }),
        context?.previousData
      )
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts.all })
    },
  })
}
```

## Best Practices

1. **Always cancel outgoing queries** - Prevents race conditions
2. **Save previous state** - Required for rollback
3. **Type your context** - Ensures type-safe rollback
4. **Always invalidate on settled** - Syncs with server
5. **Handle errors gracefully** - Show user feedback

## When to Use Optimistic Updates

✅ Use for:
- Like/unlike actions
- Toggle states
- Simple CRUD operations
- Actions where immediate feedback matters

❌ Avoid for:
- Complex validations
- Operations with side effects
- When server response differs significantly
- Critical financial operations
