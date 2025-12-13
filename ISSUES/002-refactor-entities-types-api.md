# 002: Entities 레이어 - Types & API 추출

## 목표
PostsManagerPage에서 타입 정의 및 API 함수를 entities 레이어로 추출

## 작업 내용
- [ ] `entities/post/types.ts` - Post, NewPost 타입 정의
- [ ] `entities/post/api.ts` - fetchPosts, searchPosts, fetchPostsByTag, addPost, updatePost, deletePost
- [ ] `entities/comment/types.ts` - Comment, NewComment 타입 정의
- [ ] `entities/comment/api.ts` - fetchComments, addComment, updateComment, deleteComment, likeComment
- [ ] `entities/user/types.ts` - User 타입 정의
- [ ] `entities/user/api.ts` - fetchUser, fetchUsers
- [ ] `entities/tag/types.ts` - Tag 타입 정의
- [ ] `entities/tag/api.ts` - fetchTags

## 추출 대상 (PostsManagerPage.tsx)
- fetchPosts (61-88줄)
- fetchTags (91-99줄)
- searchPosts (102-117줄)
- fetchPostsByTag (120-145줄)
- addPost (148-162줄)
- updatePost (165-178줄)
- deletePost (181-190줄)
- fetchComments (193-202줄)
- addComment (205-222줄)
- updateComment (225-241줄)
- deleteComment (244-256줄)
- likeComment (259-275줄)
- openUserModal (285-294줄)
