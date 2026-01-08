# API 응답 구조 (API Response Structure)

## 📋 개요

이 문서는 타입 정의 시 참고할 API 응답 구조를 정의합니다.
**타입 정의 시 반드시 이 구조를 따르세요.**

---

## 📡 API 엔드포인트 및 응답 구조

### 1. Posts API

#### GET `/api/posts?limit={limit}&skip={skip}`

**응답 구조:**

```json
{
  "posts": [
    {
      "id": 1,
      "title": "게시물 제목",
      "body": "게시물 내용",
      "userId": 1,
      "tags": ["tag1", "tag2"],
      "reactions": {
        "likes": 10,
        "dislikes": 2
      },
      "views": 100
    }
  ],
  "total": 150,
  "skip": 0,
  "limit": 10
}
```

#### GET `/api/posts/{id}`

**응답 구조:**

```json
{
  "id": 1,
  "title": "게시물 제목",
  "body": "게시물 내용",
  "userId": 1,
  "tags": ["tag1", "tag2"],
  "reactions": {
    "likes": 10,
    "dislikes": 2
  },
  "views": 100
}
```

#### GET `/api/posts/search?q={query}`

**응답 구조:** PostsResponse와 동일

#### GET `/api/posts/tag/{tag}`

**응답 구조:** PostsResponse와 동일

#### GET `/api/posts/tags`

**응답 구조:**

```json
{
  "tags": ["tag1", "tag2", "tag3"]
}
```

#### POST `/api/posts/add`

**요청 본문:**

```json
{
  "title": "게시물 제목",
  "body": "게시물 내용",
  "userId": 1
}
```

**응답 구조:** PostResponse와 동일

#### PUT `/api/posts/{id}`

**요청 본문:**

```json
{
  "title": "수정된 제목",
  "body": "수정된 내용"
}
```

**응답 구조:** PostResponse와 동일

---

### 2. Comments API

#### GET `/api/posts/{postId}/comments`

**응답 구조:**

```json
{
  "comments": [
    {
      "id": 1,
      "body": "댓글 내용",
      "postId": 1,
      "userId": 1,
      "likes": 5,
      "dislikes": 0
    }
  ],
  "total": 20,
  "skip": 0,
  "limit": 10
}
```

#### POST `/api/comments/add`

**요청 본문:**

```json
{
  "body": "댓글 내용",
  "postId": 1,
  "userId": 1
}
```

**응답 구조:**

```json
{
  "id": 1,
  "body": "댓글 내용",
  "postId": 1,
  "userId": 1,
  "likes": 0,
  "dislikes": 0
}
```

#### PUT `/api/comments/{id}`

**요청 본문:**

```json
{
  "body": "수정된 댓글 내용"
}
```

**응답 구조:** CommentResponse와 동일

#### POST `/api/comments/{id}/like`

**응답 구조:**

```json
{
  "id": 1,
  "body": "댓글 내용",
  "postId": 1,
  "userId": 1,
  "likes": 6,
  "dislikes": 0
}
```

---

### 3. Users API

#### GET `/api/users?limit={limit}&select={fields}`

**응답 구조:**

```json
{
  "users": [
    {
      "id": 1,
      "username": "username",
      "image": "https://example.com/image.jpg",
      "email": "user@example.com",
      "firstName": "First",
      "lastName": "Last",
      "age": 25,
      "gender": "male",
      "phone": "010-1234-5678",
      "address": {
        "address": "123 Main St",
        "city": "Seoul",
        "state": "Seoul",
        "postalCode": "12345",
        "coordinates": {
          "lat": 37.5665,
          "lng": 126.978
        }
      },
      "company": {
        "name": "Company Name",
        "title": "Developer",
        "department": "Engineering",
        "address": {
          "address": "456 Company St",
          "city": "Seoul",
          "state": "Seoul",
          "postalCode": "67890"
        }
      }
    }
  ],
  "total": 100,
  "skip": 0,
  "limit": 10
}
```

#### GET `/api/users/{id}`

**응답 구조:** User 객체 (UsersResponse의 users 배열 항목과 동일)

---

## 🎯 타입 정의 시 참고사항

1. **배열 응답**: `{ items: [], total, skip, limit }` 구조
2. **단일 항목 응답**: 항목 객체 직접 반환
3. **에러 응답**: `{ message: string, error?: any }` 구조 (타입 정의 필요 시)
4. **select 옵션**: Users API의 `select` 파라미터는 부분 필드만 반환

---

**이 구조를 참고하여 정확한 타입을 정의하세요! 🚀**
